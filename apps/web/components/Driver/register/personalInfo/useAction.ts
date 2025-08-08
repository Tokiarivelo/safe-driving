'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { personalInfoSchema } from './schema'
import type { PersonalInfoFormValues } from './schema'
import { useRouter } from 'next/navigation'

export const usePersonalInfoAction = (
  initialData: Partial<PersonalInfoFormValues> = {}
) => {
  const router = useRouter()
  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: initialData.name || '',
      email: initialData.email || '',
      phone: initialData.phone || ''
    }
  })

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
    handleFormSubmit
  }
}