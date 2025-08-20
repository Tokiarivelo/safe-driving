'use client'

import styles from './personal.module.css'
import { usePersonalInfoAction } from './useAction'
import { useTranslation } from 'react-i18next'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CardFormContainer } from '@/components/ui/CardFormContainer'
import { StepListCard } from '@/components/ui/StepListCard'
import { StepIndicator } from '@/components/ui/PogressBar'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import * as icons from 'lucide-react'
import { PersonalInfoFormValues } from './schema' 

interface PersonalInfoFormProps {
  initialData?: {
    name?: string
    email?: string
    phone?: string
  }
  onSubmit: (data: PersonalInfoFormValues & { userId: string }) => Promise<void> | void
}

export const PersonalInfoForm = ({ initialData, onSubmit }: PersonalInfoFormProps) => {
  const { form, handleFormSubmit, loading, error } = usePersonalInfoAction(initialData)
  const { t } = useTranslation(['registerDriver/step2', 'registerDriver/stepList'])
  const { data: session } = useSession()

  const iconNames = [
    'User', 'UserRound', 'IdCard', 'CarFront', 'FileUp', 'Camera',
    'MapPin', 'Bell', 'Settings', 'ClipboardList', 'CheckCircle'
  ]

  const STEPS = Array.from({ length: 11 }, (_, i) => {
    const stepNum = i + 1
    const iconName = iconNames[i]
    const IconComponent = (icons as Record<string, React.FC<any>>)[iconName] ?? icons.Hand

    return {
      id: `step${stepNum}`,
      icon: <IconComponent size={18} />,
      title: t(`registerDriver/stepList:step${stepNum}`),
    }
  })

  const processSubmit = async (data: PersonalInfoFormValues) => {
    try {
      if (!session?.user?.id) {
        throw new Error('User not authenticated')
      }

      await onSubmit({ 
        ...data,
        userId: session.user.id
      })
      await handleFormSubmit(data)
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
    }
  }

  if (loading) {
    return <div>Chargement des données utilisateur...</div>
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Erreur lors du chargement des données: {error}
        <button 
          onClick={() => window.location.reload()} 
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Réessayer
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen auth-background dark:bg-background flex flex-col items-center justify-start px-4 py-8">
      <div className="mt-10">
        <StepIndicator
          steps={[
            { number: 1, label: t('registerDriver/stepList:progressionRole'), status: 'completed' },
            { number: 2, label: t('registerDriver/stepList:progressionInfo'), status: 'active' },
          ]}
        />
      </div>

      <CardFormContainer 
        title=""
        subtitle=""
        className="relative max-w-6xl w-full p-0 mt-5"
      >
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex-1 p-12 pt-6 flex flex-col relative bg-[var(--color-auth-color-bg-white)] dark:bg-card">
            <div className="absolute top-6 left-6">
              <Image 
                src="/logo.svg" 
                alt="Logo" 
                width={64} 
                height={64} 
                className="dark:invert dark:brightness-0 dark:contrast-200"
              />
            </div>

            <div className={styles.contentContainer}>
              <div className={styles.textContainer}>
                <h1 className={styles.title}>{t('title')}</h1>
                <p className={styles.subtitle}>{t('subtitle')}</p>
              </div>

              <div className={styles.formContainer}>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(processSubmit)}>
                    <div className="space-y-6">
                      
                      {/* Champ Nom */}
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-[var(--color-auth-color-subtitle)]">
                          {t('form.name.label')}
                        </p>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <Input
                              placeholder={t('form.name.placeholder')}
                              {...field}
                            />
                          )}
                        />
                      </div>

                      {/* Champ Email */}
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-[var(--color-auth-color-subtitle)]">
                          {t('form.email.label')}
                        </p>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <Input
                              placeholder={t('form.email.placeholder')}
                              type="email"
                              {...field}
                            />
                          )}
                        />
                      </div>

                      {/* Champ Téléphone */}
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-[var(--color-auth-color-subtitle)]">
                          {t('form.phone.label')}
                        </p>
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <Input
                              placeholder={t('form.phone.placeholder')}
                              type="tel"
                              {...field}
                            />
                          )}
                        />
                      </div>

                      {/* Boutons */}
                      <div className={styles.buttonContainer}>
                        <Button variant="outline" type="button" className={styles.buttonOutline}>
                          {t('buttons.later')}
                        </Button>
                        <Button 
                          type="submit" 
                          className={styles.buttonPrimary}
                          disabled={form.formState.isSubmitting}
                        >
                          {form.formState.isSubmitting ? t('buttons.processing') : t('buttons.validate')}
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>

          <div className={styles.sidebar}>
            <StepListCard 
              steps={STEPS}
              currentStepId="step2"
            />
          </div>
        </div>
      </CardFormContainer>
    </div>
  )
}