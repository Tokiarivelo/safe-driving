'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function UserQrPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const qrUrl = searchParams.get('qrUrl')

  if (!qrUrl) return <div>Erreur lors de la récupération du QR Code</div>

  const downloadQr = () => {
    const link = document.createElement('a')
    link.href = qrUrl
    link.download = 'qr-code.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-xl font-semibold mb-4">Votre QR Code</h1>
      
      <img src={qrUrl} alt="QR Code utilisateur" className="w-64 h-64 object-contain" />

      <p className="text-sm text-gray-500">Scannez ce QR Code pour récupérer vos informations.</p>

      <Button onClick={downloadQr}>Télécharger le QR Code</Button>

      <Button
        onClick={() => router.push('/scan')}
        variant="outline"
      >
        Scanner QR Code
      </Button>
    </div>
  )
}
