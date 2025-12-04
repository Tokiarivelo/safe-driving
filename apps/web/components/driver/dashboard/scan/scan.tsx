'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import { ConversationType, UserByTokenDocument } from '@/graphql/generated/graphql';
import { useConversations } from '@/lib/conversation/useConversations';
import { useScanSession } from '@/hooks/useScanSession';
import { Button } from '@/components/ui/button';
import UserInfoPopup from '@/components/scan/UserInfoPopup';

const CREATE_SCAN_SESSION = gql`
  mutation CreateScanSession {
    createScanSession {
      sessionId
      qrBase64
    }
  }
`;

interface ScanQrCodeComponentProps {
  redirectPath?: string; // Allow customizing where to redirect for messages
}

export default function ScanQrCodeComponent({
  redirectPath = '/driver/dashboard/messages',
}: ScanQrCodeComponentProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [qrData, setQrData] = useState<Record<string, string> | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loadingConversation, setLoadingConversation] = useState(false);
  const [scanMode, setScanMode] = useState<'camera' | 'phone' | null>(null);

  // Phone scan session state
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [qrBase64, setQrBase64] = useState<string | null>(null);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  const { conversations, createConversation } = useConversations();

  const [getUser, { data: userData, loading: userLoading, error: userError }] =
    useLazyQuery(UserByTokenDocument);

  const [createScanSession, { loading: createSessionLoading }] = useMutation(CREATE_SCAN_SESSION);

  // Handle scan result from phone
  const handlePhoneScanResult = useCallback((result: { scannedValue: string }) => {
    try {
      const url = new URL(result.scannedValue);
      const params: Record<string, string> = {};
      url.searchParams.forEach((value, key) => {
        params[key] = value;
      });
      setQrData(params);
      setIsPhoneModalOpen(false);
      setSessionId(null);
      setQrBase64(null);
    } catch {
      // If not a URL, try to use it as a token directly
      setQrData({ token: result.scannedValue });
      setIsPhoneModalOpen(false);
      setSessionId(null);
      setQrBase64(null);
    }
  }, []);

  const handleSessionExpired = useCallback(() => {
    setIsPhoneModalOpen(false);
    setSessionId(null);
    setQrBase64(null);
    setError('Session expirée. Veuillez réessayer.');
  }, []);

  const { isConnected, error: socketError } = useScanSession(sessionId, {
    onScanResult: handlePhoneScanResult,
    onSessionExpired: handleSessionExpired,
  });

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.replace('/login');
  }, [status, session, router]);

  // Camera scan logic
  useEffect(() => {
    if (scanMode !== 'camera' || !videoRef.current) return;

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

        const controls = await codeReader.decodeFromConstraints(
          constraints,
          videoElement,
          (result, scanError) => {
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
                // Stop the stream and controls
                if (controlsRef.current) {
                  controlsRef.current.stop();
                  controlsRef.current = null;
                }
                if (streamRef.current) {
                  streamRef.current.getTracks().forEach(track => track.stop());
                }
              } catch {
                setError('QR code illisible.');
              }
            }

            if (scanError && scanError.name !== 'NotFoundException') {
              console.error(scanError);
            }
          },
        );

        if (!active) {
          // Component unmounted or stopped while initializing
          controls.stop();
          return;
        }

        controlsRef.current = controls;
      } catch (err) {
        console.error(err);
        setError("Impossible d'accéder à la caméra.");
      }
    }

    startScan();

    return () => {
      active = false;
      // Cleanup stream and controls on unmount
      if (controlsRef.current) {
        controlsRef.current.stop();
        controlsRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [scanMode]);

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

  const handleStartCameraScan = () => {
    setError(null);
    setQrData(null);
    setScanMode('camera');
  };

  const handleStartPhoneScan = async () => {
    setError(null);
    setQrData(null);
    setScanMode('phone');
    try {
      const { data } = await createScanSession();
      if (data?.createScanSession) {
        setSessionId(data.createScanSession.sessionId);
        setQrBase64(data.createScanSession.qrBase64);
        setIsPhoneModalOpen(true);
      }
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la création de la session de scan.');
    }
  };

  const handleClosePhoneModal = () => {
    setIsPhoneModalOpen(false);
    setSessionId(null);
    setQrBase64(null);
    setScanMode(null);
  };

  const handleBack = () => {
    setScanMode(null);
    setError(null);
    setQrData(null);
    // Stop camera if running
    if (controlsRef.current) {
      controlsRef.current.stop();
      controlsRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

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
        const ids = conv.participants?.map((p: { user: { id: string } }) => p.user.id) || [];
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

      router.push(`${redirectPath}?conversationId=${conversationId}`);
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

  // Initial screen - choose scan method
  if (scanMode === null) {
    return (
      <div className="flex min-h-screen">
        <div className="flex flex-col flex-1 items-center justify-center py-8 space-y-6">
          <h1 className="text-2xl font-bold dark:text-white">Scanner un QR Code</h1>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
            Choisissez comment vous souhaitez scanner le QR code
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              onClick={handleStartCameraScan}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Scanner avec la caméra
            </Button>

            <Button
              onClick={handleStartPhoneScan}
              disabled={createSessionLoading}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              {createSessionLoading ? 'Chargement...' : 'Scanner par un téléphone'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Camera scan mode
  if (scanMode === 'camera') {
    return (
      <div className="flex min-h-screen flex-col items-center bg-white">
        {/* Header */}
        <div className="w-full max-w-2xl px-4 py-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">Scanner un QR Code</h1>
          <p className="text-gray-500 text-center mt-2 text-sm">
            Positionnez le QRCode devant la caméra pour l&apos;analyser.
          </p>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Scanner area */}
        <div
          className="relative bg-gray-700 rounded-lg overflow-hidden"
          style={{ width: '400px', height: '300px' }}
        >
          <video
            ref={videoRef}
            width="400"
            height="300"
            className="w-full h-full object-cover"
            autoPlay
            playsInline
          />

          {/* Corner frames */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top-left corner */}
            <div className="absolute top-4 left-4 w-12 h-12 border-l-4 border-t-4 border-white" />
            {/* Top-right corner */}
            <div className="absolute top-4 right-4 w-12 h-12 border-r-4 border-t-4 border-white" />
            {/* Bottom-left corner */}
            <div className="absolute bottom-4 left-4 w-12 h-12 border-l-4 border-b-4 border-white" />
            {/* Bottom-right corner */}
            <div className="absolute bottom-4 right-4 w-12 h-12 border-r-4 border-b-4 border-white" />
          </div>

          {/* Scan button */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-red-400" />
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-6">
          <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Retour
          </Button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {socketError && <p className="text-red-500">Erreur de connexion: {socketError.message}</p>}

        {userLoading && <p>Chargement de l&apos;utilisateur...</p>}
        {userError && <p className="text-red-500">Erreur: {userError.message}</p>}

        {/* Phone scan modal */}
        {isPhoneModalOpen && qrBase64 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold dark:text-white">
                  Scannez avec votre téléphone
                </h2>
                <button
                  onClick={handleClosePhoneModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Fermer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <img
                    src={qrBase64}
                    alt="QR Code à scanner avec votre téléphone"
                    className="mx-auto w-64 h-64"
                  />
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Scannez ce QR code avec l&apos;application mobile pour continuer
                </p>

                <div className="flex items-center justify-center gap-2 text-sm">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isConnected ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                  />
                  <span className="text-gray-500 dark:text-gray-400">
                    {isConnected ? 'Connecté - En attente du scan...' : 'Connexion en cours...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {userLoading && <p className="mt-4">Chargement de l&apos;utilisateur...</p>}
        {userError && <p className="text-red-500 mt-4">Erreur: {userError.message}</p>}

        {showPopup && user && (
          <UserInfoPopup
            user={user}
            onClose={() => setShowPopup(false)}
            onContact={handleContact}
            isLoadingContact={loadingConversation}
          />
        )}
      </div>
    );
  }

  // Phone scan mode (showing QR for phone to scan)
  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      {/* Header */}
      <div className="w-full max-w-2xl px-4 py-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Scanner un QR Code
        </h1>
        <p className="text-gray-500 text-center mt-2 text-sm">
          Scannez le QR code affiché avec votre téléphone.
        </p>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {socketError && (
        <p className="text-red-500 mb-4">Erreur de connexion: {socketError.message}</p>
      )}

      {/* Back button */}
      <div className="mb-6">
        <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour
        </Button>
      </div>

      {userLoading && <p>Chargement de l&apos;utilisateur...</p>}
      {userError && <p className="text-red-500">Erreur: {userError.message}</p>}

      {/* Phone scan modal */}
      {isPhoneModalOpen && qrBase64 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold dark:text-white">
                Scannez avec votre téléphone
              </h2>
              <button
                onClick={handleClosePhoneModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Fermer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <img
                  src={qrBase64}
                  alt="QR Code à scanner avec votre téléphone"
                  className="mx-auto w-64 h-64"
                />
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Scannez ce QR code avec l&apos;application mobile pour continuer
              </p>

              <div className="flex items-center justify-center gap-2 text-sm">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isConnected ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                />
                <span className="text-gray-500 dark:text-gray-400">
                  {isConnected ? 'Connecté - En attente du scan...' : 'Connexion en cours...'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPopup && user && (
        <UserInfoPopup
          user={user}
          onClose={() => setShowPopup(false)}
          onContact={handleContact}
          isLoadingContact={loadingConversation}
        />
      )}
    </div>
  );
}
