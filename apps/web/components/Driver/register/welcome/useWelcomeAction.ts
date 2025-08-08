'use client'
import { useRouter } from 'next/navigation'

export const useWelcomeAction = () => {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/personalInfo')
  }

  return {
    handleGetStarted
  }
}