'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { personalInfoSchema } from './schema'
import type { PersonalInfoFormValues } from './schema'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const usePersonalInfoAction = (
  initialData: Partial<PersonalInfoFormValues> = {}
) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      // Utilisez une assertion de type pour accéder à sessionToken
      const typedSession = session as any
      if (!typedSession?.user?.id || !typedSession.sessionToken) {
        setLoading(false)
        setError('User not authenticated')
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/driver', {
          credentials: 'include', // Important pour envoyer les cookies
          headers: {
            'Content-Type': 'application/json',
          }
        })
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || 'Failed to fetch user data')
        }

        const data = await response.json()
        setUserData(data.user)
      } catch (error) {
        console.error('Error fetching user data:', error)
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    if (session) {
      fetchUserData()
    }
  }, [session])

  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  })

  useEffect(() => {
    if (userData) {
      form.reset({
        name: `${userData.firstName} ${userData.lastName || ''}`.trim(),
        email: userData.email,
        phone: userData.phone || ''
      })
    }
  }, [userData, form])

  const handleFormSubmit = async (data: PersonalInfoFormValues) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      router.push('/identityUpload')
      return true
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
      return false
    }
  }

  return {
    form,
    handleFormSubmit,
    loading,
    error,
    userData
  }
}