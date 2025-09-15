'use client'

import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { BrowserQRCodeReader, Result } from '@zxing/library'
import { useLazyQuery } from '@apollo/client'
import { UserByTokenDocument } from '@/graphql/generated/graphql' 

export default function ScanPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [qrData, setQrData] = useState<Record<string, string> | null>(null)

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
          undefined,
          videoRef.current!,
          (result: Result | undefined) => {
            if (!active) return

            if (result) {
              console.log('QR code détecté:', result.getText())
              try {
                const url = new URL(result.getText())
                const params: Record<string, string> = {}
                url.searchParams.forEach((value, key) => {
                  params[key] = value
                })
                setQrData(params)

                // stop scan
                active = false
                const tracks = (videoRef.current?.srcObject as MediaStream)?.getTracks()
                tracks?.forEach((track) => track.stop())
                codeReader.reset()
              } catch (parseErr) {
                console.error('Impossible de parser le QR code:', parseErr)
                setError('QR code illisible.')
              }
            }
          }
        )
      } catch (err) {
        console.error('Erreur caméra:', err)
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

  if (status === 'loading') return <p>Chargement...</p>
  if (!session) return null

  return (
    <div className="min-h-screen flex flex-col items-center py-8 space-y-6">
      <h1 className="text-xl font-bold">Scan QR Code</h1>

      {error && <p className="text-red-500">{error}</p>}
      <video ref={videoRef} width="400" height="300" className="border rounded" />

      {userLoading && <p>Chargement de l’utilisateur...</p>}
      {userError && <p className="text-red-500">Erreur: {userError.message}</p>}

      {userData?.userByToken && (
        <div className="p-6 border rounded space-y-2 w-full max-w-md">
          <h2 className="text-lg font-semibold">Utilisateur trouvé :</h2>
          <p>
            {userData.userByToken.firstName} {userData.userByToken.lastName}
          </p>
          <p>Email : {userData.userByToken.email}</p>
          <p>Téléphone : {userData.userByToken.phone}</p>
          <p>Username : {userData.userByToken.username}</p>
          {userData.userByToken.UserImage?.url && (
            <img
              src={userData.userByToken.UserImage.url}
              alt="Profile"
              width={100}
              className="rounded"
            />
          )}
          {userData.userByToken.Role && <p>Rôle : {userData.userByToken.Role.name}</p>}
        </div>
      )}
    </div>
  )
}
