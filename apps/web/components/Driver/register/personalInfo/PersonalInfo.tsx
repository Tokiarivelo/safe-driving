'use client'

import styles from './personal.module.css'
import { usePersonalInfoAction } from './useAction'
import { useTranslation } from 'react-i18next'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
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
  const { t } = useTranslation(['registerDriver/step2'])
  const { data: session } = useSession()

  const processSubmit = async (data: PersonalInfoFormValues) => {
    try {
      if (!session?.user?.id) {
        throw new Error('User not authenticated')
      }

      await onSubmit({
        ...data,
        userId: session.user.id,
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
    <div className="w-full px-4 py-8">
      <div className={styles.contentContainer}>
        {/* En-tête aligné sur le style Welcome */}
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        {/* Formulaire centré et lisible */}
        <div className={styles.formContainer}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(processSubmit)}>
              <div className="space-y-3 sm:space-y-4">
                {/* Champ Nom */}
                <div className={`flex flex-col gap-0.5 ${styles.fieldGroup}`}>
                  <p className="text-[13px] sm:text-sm font-medium text-[var(--color-auth-color-subtitle)]">
                    {t('form.name.label')}
                  </p>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <Input placeholder={t('form.name.placeholder')} wrapperClassName="px-3" {...field} />
                    )}
                  />
                </div>

                {/* Champ Email */}
                <div className={`flex flex-col gap-0.5 ${styles.fieldGroup}`}>
                  <p className="text-[13px] sm:text-sm font-medium text-[var(--color-auth-color-subtitle)]">
                    {t('form.email.label')}
                  </p>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <Input
                        placeholder={t('form.email.placeholder')}
                        type="email"
                        wrapperClassName="px-3"
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* Champ Téléphone */}
                <div className={`flex flex-col gap-0.5 ${styles.fieldGroup}`}>
                  <p className="text-[13px] sm:text-sm font-medium text-[var(--color-auth-color-subtitle)]">
                    {t('form.phone.label')}
                  </p>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <Input
                        placeholder={t('form.phone.placeholder')}
                        type="tel"
                        wrapperClassName="px-4"
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* Boutons alignés sur le style Welcome */}
                <div className={`${styles.buttonContainer} space-x-2 sm:space-x-3`}>
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
  )
}