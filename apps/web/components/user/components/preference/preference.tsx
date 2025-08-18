'use client';

import styles from './preference.module.css';
import { useRouter } from 'next/navigation';
import { Radio, RadioGroup } from '@/components/ui/radiogroup';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MultiSelect } from '@/components/ui/multi-select';
import { Car, CableCar, Bike } from 'lucide-react';

const options = [
  {
    value: 'moto',
    label: 'moto',
    icon: <Bike size={14} className="text-white" />,
  },
  {
    value: 'voiture',
    label: 'voiture',
    icon: <Car size={14} className="text-white" />,
  },
  {
    value: 'telipherique',
    label: 'telipherique',
    icon: <CableCar size={14} className="text-white" />,
  },
];

const languages = [
  {
    code: 'fr',
    name: 'Francais',
    flag: 'https://flagcdn.com/fr.svg',
    alt: 'Fiteny Frantsay',
  },
  {
    code: 'en',
    name: 'Anglais',
    flag: 'https://flagcdn.com/gb.svg',
    alt: 'Fiteny Anglisy',
  },
  {
    code: 'mg',
    name: 'Malagasy',
    flag: 'https://flagcdn.com/mg.svg',
    alt: 'Fiteny Malagasy',
  },
  {
    code: 'es',
    name: 'Español',
    flag: 'https://flagcdn.com/es.svg',
    alt: 'Fiteny Espagnol',
  },
  {
    code: 'de',
    name: 'Deutsch',
    flag: 'https://flagcdn.com/de.svg',
    alt: 'Fiteny Alemanina',
  },
  {
    code: 'it',
    name: 'Italiano',
    flag: 'https://flagcdn.com/it.svg',
    alt: 'Fiteny Italiana',
  },
  {
    code: 'pt',
    name: 'Português',
    flag: 'https://flagcdn.com/pt.svg',
    alt: 'Fiteny Portiogey',
  },
  {
    code: 'zh',
    name: '中文',
    flag: 'https://flagcdn.com/cn.svg',
    alt: 'Fiteny Sinoa',
  },
  {
    code: 'ja',
    name: '日本語',
    flag: 'https://flagcdn.com/jp.svg',
    alt: 'Fiteny Japoney',
  },
  {
    code: 'ko',
    name: '한국어',
    flag: 'https://flagcdn.com/kr.svg',
    alt: 'Fiteny Koreana',
  },
];

// Default language - jerena amin'ny current lang value
const getDefaultLanguage = (langCode: string) => {
  return languages.find(lang => lang.code === langCode) || languages[0];
};

export const Notification = () => {
  const router = useRouter();
  const [size, setSize] = useState('medium');
  const { t, ready } = useTranslation('user/preference');
  const [lang, setLang] = useState('fr');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (value: string) => {
    setLang(value);
    console.log('languer:', value);
  };

  const currentLanguage = getDefaultLanguage(lang);
  if (!ready) return null;

  return (
    <>
      <div className={styles.auth_pref3}>
        <motion.h2
          className={styles.auth_pref4}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </motion.h2>
        <motion.p
          className={styles.auth_pref5}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t('title1')} <br className="sm:hidden" />
          {t('title2')}
        </motion.p>
      </div>

      <div className={styles.auth_pref6}>
        <div className={styles.auth_pref7}></div>

        {/* Theme Section */}
        <div className={styles.auth_pref8}>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={styles.auth_pref9}
          >
            {t('title3')}
          </motion.h3>
        </div>
        <div className={styles.auth_pref10}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={styles.auth_not7}
          >
            <Radio
              name="theme"
              value="claire"
              id="claire"
              checked={size === 'claire'}
              onChange={e => setSize(e.target.value)}
            />
            <label htmlFor="claire" className={styles.auth_not8}>
              {t('title4')}
            </label>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={styles.auth_not9}
          >
            <Radio
              name="theme"
              value="Actuve"
              id="Actuve"
              checked={size === 'Actuve'}
              onChange={e => setSize(e.target.value)}
            />
            <label htmlFor="Actuve" className={styles.auth_not10}>
              {t('title5')}
            </label>
          </motion.div>
        </div>

        <div className={styles.auth_pref11}>
          <form>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={styles.auth_pref12}
            >
              <label className={styles.auth_pref13}>{t('title6')}</label>
              <MultiSelect
                options={options}
                value={selectedValues}
                onValueChange={setSelectedValues}
                placeholder={t('title6')}
                className={styles.auth_pref14}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={styles.auth_pref15}
            >
              <label htmlFor="lang-select" className={styles.auth_pref16}>
                {t('title7')}
              </label>
              <Select value={lang} onValueChange={handleChange}>
                <SelectTrigger id="lang-select" size="default" className={styles.auth_pref17}>
                  <SelectValue>
                    <div className={styles.auth_pref18}>
                      <img
                        src={currentLanguage.flag}
                        alt={currentLanguage.alt}
                        className={styles.auth_pref19}
                        loading="lazy"
                      />
                      <span className={styles.auth_pref20}>{currentLanguage.name}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>

                <SelectContent className={styles.auth_pref21}>
                  {languages.map(language => (
                    <SelectItem
                      key={language.code}
                      value={language.code}
                      className={styles.auth_pref22}
                    >
                      <div className={styles.auth_pref23}>
                        <img
                          src={language.flag}
                          alt={language.alt}
                          className={styles.auth_pref24}
                          loading="lazy"
                        />
                        <span className={styles.auth_pref25}>{language.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          </form>
        </div>
      </div>

      <div className={styles.auth_pref26}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            type="button"
            onClick={() => router.push('/user/form/name/gps')}
            className={styles.auth_bjr7}
          >
            {t('title8')}
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            type="button"
            onClick={() => router.push('/user/form/name/gps')}
            className={styles.auth_bjr8}
          >
            {t('title9')}
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default Notification;
