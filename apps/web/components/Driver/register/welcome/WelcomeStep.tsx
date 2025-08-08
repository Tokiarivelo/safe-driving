'use client'
import styles from './welcome.module.css';
import { useWelcomeAction } from './useWelcomeAction'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { CardFormContainer } from '@/components/ui/CardFormContainer'
import { StepListCard } from '@/components/ui/StepListCard'
import { StepIndicator } from '@/components/ui/PogressBar'
import * as icons from 'lucide-react'

export function WelcomeStep() {
  const { handleGetStarted } = useWelcomeAction()
  const { t } = useTranslation(['registerDriver/step1', 'registerDriver/stepList'])

  const iconNames = [
    'User',         
    'UserRound',       
    'IdCard',      
    'CarFront',  
    'FileUp',    
    'Camera',          
    'MapPin',  
    'Bell',   
    'Settings',  
    'ClipboardList',
    'CheckCircle'   
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

  return (
    <div className="min-h-screen auth-background dark:bg-background flex flex-col items-center justify-start px-4 py-8">
      <div className="mt-10">
        <StepIndicator
          steps={[
            { number: 1, label: t('registerDriver/stepList:progressionRole'), status: 'active' },
            { number: 2, label: t('registerDriver/stepList:progressionInfo'), status: 'inactive' }
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

              <div className={styles.buttonContainer}>
                <Button variant="outline" className={styles.buttonOutline}>
                  {t('buttons.later')}
                </Button>
                <Button className={styles.buttonPrimary} onClick={handleGetStarted}>
                  {t('buttons.start')}
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.sidebar}>
            <StepListCard 
              steps={STEPS}
              currentStepId="step1"
            />
          </div>
        </div>
      </CardFormContainer>
    </div>
  )
}
