'use client'
import styles from './welcome.module.css'
import { useWelcomeAction } from './useWelcomeAction'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function WelcomeStep() {
  const { handleGetStarted } = useWelcomeAction()
  const { t, ready } = useTranslation(['registerDriver/step1'])
  if (!ready) return null

  return (
    <>
      <div className={styles.auth_bjr3}>
        <motion.h1
          className={styles.auth_bjr4}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </motion.h1>

        <motion.p
          className={styles.auth_bjr5}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t('subtitle')}

        </motion.p>
      </div>

      <div className={styles.auth_bjr6}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button type="button" className={styles.auth_bjr7}>
            {t('buttons.later')}
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button type="button" onClick={handleGetStarted} className={styles.auth_bjr8}>
            {t('buttons.start')}
          </Button>
        </motion.div>
      </div>
    </>
  )
}
