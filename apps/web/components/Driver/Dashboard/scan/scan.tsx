'use client'

import Sidebare from '../sidebare/sidebare'
import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { BrowserQRCodeReader, Result } from '@zxing/library'
import { useLazyQuery } from '@apollo/client'
import { ConversationType, UserByTokenDocument } from '@/graphql/generated/graphql'
import { Popup } from '@/components/ui/popup'
import { useConversations } from '@/lib/conversation/useConversations'

export default function ScanPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [qrData, setQrData] = useState<Record<string, string> | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [loadingConversation, setLoadingConversation] = useState(false)

  const { conversations, createConversation } = useConversations()

  const [getUser, { data: userData, loading: userLoading, error: userError }] =
    useLazyQuery(UserByTokenDocument)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.replace('/login')
  }, [status, session, router])

  useEffect(() => {
    if (!videoRef.current) return

    const codeReader = new BrowserQRCodeReader()
    let active = true

    async function startScan() {
      try {
        if (!videoRef.current!.srcObject) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
          })
          videoRef.current!.srcObject = stream
          await videoRef.current!.play()
        }

        codeReader.decodeFromVideoDevice(
          null,
          videoRef.current!,
          (result: Result | undefined) => {
            if (!active) return

            if (result) {
              try {
                const url = new URL(result.getText())
                const params: Record<string, string> = {}
                url.searchParams.forEach((value, key) => {
                  params[key] = value
                })
                setQrData(params)

                active = false
                const tracks = (videoRef.current?.srcObject as MediaStream)?.getTracks()
                tracks?.forEach((track) => track.stop())
                codeReader.reset()
              } catch (parseErr) {
                setError('QR code illisible.')
              }
            }
          }
        )
      } catch (err) {
        setError('Impossible d’accéder à la caméra.')
      }
    }

    startScan()

    return () => {
      active = false
      const tracks = (videoRef.current?.srcObject as MediaStream)?.getTracks()
      tracks?.forEach((track) => track.stop())
      codeReader.reset()
    }
  }, [])

  useEffect(() => {
    if (qrData?.token) {
      getUser({ variables: { token: qrData.token } })
    }
  }, [qrData, getUser])

  useEffect(() => {
    if (userData?.userByToken) {
      setShowPopup(true)
    }
  }, [userData])

  const handleContact = async () => {
    if (!userData?.userByToken || !session?.user?.id) return
    setLoadingConversation(true)

    try {
      const scannedUser = userData.userByToken
      const currentUserId = session.user.id
      const targetUserId = scannedUser.id

      if (targetUserId === currentUserId) {
        alert('Vous ne pouvez pas vous contacter vous-même.')
        return
      }

      // Vérifie s’il existe déjà une conversation directe
      let existing = conversations.find((conv) => {
        if (conv.type !== 'DIRECT') return false
        const ids = conv.participants?.map((p) => p.user.id) || []
        return ids.includes(currentUserId) && ids.includes(targetUserId)
      })

      let conversationId = existing?.id

      if (!conversationId) {
        const newConv = await createConversation({
          type: ConversationType.DIRECT,
          title: `${session.user.firstName || 'Moi'} & ${scannedUser.firstName}`,
          participantIds: [targetUserId],
        })

        if (!newConv?.id) {
          throw new Error('Conversation non créée')
        }

        conversationId = newConv.id
      }

      router.push(`/driver/dashboard/messages?conversationId=${conversationId}`)
      setShowPopup(false)
    } catch (err) {
      console.error(err)
      alert('Erreur lors de l’ouverture de la conversation.')
    } finally {
      setLoadingConversation(false)
    }
  }

  if (status === 'loading') return <p>Chargement...</p>
  if (!session) return null

  const user = userData?.userByToken

  return (
    <div className="flex min-h-screen">
      <Sidebare />

      <div className="flex flex-col flex-1 items-center py-8 space-y-6">
        <h1 className="text-xl font-bold">Scan QR Code</h1>

        {error && <p className="text-red-500">{error}</p>}
        <video ref={videoRef} width="400" height="300" className="border rounded" />

        {userLoading && <p>Chargement de l’utilisateur...</p>}
        {userError && <p className="text-red-500">Erreur: {userError.message}</p>}

        {showPopup && user && (
          <Popup
            title="Utilisateur trouvé"
            onClose={() => setShowPopup(false)}
            content={
              <div className="space-y-2">
                <p><strong>Nom :</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Email :</strong> {user.email}</p>
                <p><strong>Téléphone :</strong> {user.phone}</p>
                <p><strong>Username :</strong> {user.username}</p>
                {user.UserImage?.url && (
                  <img
                    src={user.UserImage.url}
                    alt="Profile"
                    width={100}
                    className="rounded"
                  />
                )}
                {user.Role && <p><strong>Rôle :</strong> {user.Role.name}</p>}

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
  )
}
