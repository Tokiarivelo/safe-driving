'use client';

import LeftSidebarMenu from '../sidebare/left-sidebar-menu';
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BrowserQRCodeReader } from '@zxing/browser';
import { useLazyQuery } from '@apollo/client';
import { ConversationType, UserByTokenDocument } from '@/graphql/generated/graphql';
import { Popup } from '@/components/ui/popup';
import { useConversations } from '@/lib/conversation/useConversations';
import Image from 'next/image';

export default function ScanPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [qrData, setQrData] = useState<Record<string, string> | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loadingConversation, setLoadingConversation] = useState(false);

  const { conversations, createConversation } = useConversations();

  const [getUser, { data: userData, loading: userLoading, error: userError }] =
    useLazyQuery(UserByTokenDocument);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.replace('/login');
  }, [status, session, router]);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = videoRef.current;
    const codeReader = new BrowserQRCodeReader();
    let active = true;

    async function startScan() {
      try {
        const constraints = {
          video: { facingMode: 'environment' },
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        videoElement.srcObject = stream;

        await codeReader.decodeFromConstraints(constraints, videoElement, (result, error) => {
          if (!active) return;

          if (result) {
            try {
              const url = new URL(result.getText());
              const params: Record<string, string> = {};
              url.searchParams.forEach((value, key) => {
                params[key] = value;
              });
              setQrData(params);

              active = false;
              // Stop the stream
              if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
              }
            } catch {
              setError('QR code illisible.');
            }
          }

          if (error && error.name !== 'NotFoundException') {
            console.error(error);
          }
        });
      } catch (err) {
        console.error(err);
        setError("Impossible d'accéder à la caméra.");
      }
    }

    startScan();

    return () => {
      active = false;
      // Cleanup stream on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (qrData?.token) {
      getUser({ variables: { token: qrData.token } });
    }
  }, [qrData, getUser]);

  useEffect(() => {
    if (userData?.userByToken) {
      setShowPopup(true);
    }
  }, [userData]);

  const handleContact = async () => {
    if (!userData?.userByToken || !session?.user?.id) return;
    setLoadingConversation(true);

    try {
      const scannedUser = userData.userByToken;
      const currentUserId = session.user.id;
      const targetUserId = scannedUser.id;

      if (targetUserId === currentUserId) {
        alert('Vous ne pouvez pas vous contacter vous-même.');
        return;
      }

      // Vérifie s'il existe déjà une conversation directe
      const existing = conversations.find(conv => {
        if (conv.type !== 'DIRECT') return false;
        const ids = conv.participants?.map(p => p.user.id) || [];
        return ids.includes(currentUserId) && ids.includes(targetUserId);
      });

      let conversationId = existing?.id;

      if (!conversationId) {
        const newConv = await createConversation({
          type: ConversationType.DIRECT,
          title: `${session.user.firstName || 'Moi'} & ${scannedUser.firstName}`,
          participantIds: [targetUserId],
        });

        if (!newConv?.id) {
          throw new Error('Conversation non créée');
        }

        conversationId = newConv.id;
      }

      router.push(`/driver/Dashboard/messages?conversationId=${conversationId}`);
      setShowPopup(false);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ouverture de la conversation.");
    } finally {
      setLoadingConversation(false);
    }
  };

  if (status === 'loading') return <p>Chargement...</p>;
  if (!session) return null;

  const user = userData?.userByToken;

  return (
    <div className="flex min-h-screen">
      <LeftSidebarMenu />

      <div className="flex flex-col flex-1 items-center py-8 space-y-6">
        <h1 className="text-xl font-bold">Scan QR Code</h1>

        {error && <p className="text-red-500">{error}</p>}
        <video
          ref={videoRef}
          width="400"
          height="300"
          className="border rounded"
          autoPlay
          playsInline
        />

        {userLoading && <p>Chargement de l&apos;utilisateur...</p>}
        {userError && <p className="text-red-500">Erreur: {userError.message}</p>}

        {showPopup && user && (
          <Popup
            title="Utilisateur trouvé"
            onClose={() => setShowPopup(false)}
            content={
              <div className="space-y-2">
                <p>
                  <strong>Nom :</strong> {user.firstName} {user.lastName}
                </p>
                <p>
                  <strong>Email :</strong> {user.email}
                </p>
                <p>
                  <strong>Téléphone :</strong> {user.phone}
                </p>
                <p>
                  <strong>Username :</strong> {user.username}
                </p>
                {user.UserImage?.url && (
                  <Image
                    src={user.UserImage.url}
                    alt="Profile"
                    width={100}
                    height={100}
                    className="rounded"
                  />
                )}
                {user.Role && (
                  <p>
                    <strong>Rôle :</strong> {user.Role.name}
                  </p>
                )}

                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleContact}
                  disabled={loadingConversation}
                >
                  {loadingConversation ? 'Ouverture...' : 'Contacter'}
                </button>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
}
