'use client'
import { PersonalInfoForm } from '@/components/Driver/register/personalInfo/PersonalInfo'

export default function WelcomePage() {
  const handleSubmit = async (data: { name: string; email: string; phone: string }) => {
  }
  return <PersonalInfoForm onSubmit={handleSubmit} />
}