'use client';

import styles from './recapitulatif.module.css';
import { useRouter } from 'next/navigation';
import { Radio, RadioGroup } from '@/components/ui/radiogroup';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import * as React from 'react';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MultiSelect } from '@/components/ui/multi-select';
import { CableCar, Car, Bike } from 'lucide-react';

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

export default function Notification() {
  const router = useRouter();
  const [size, setSize] = React.useState('medium');
  const { t, ready } = useTranslation('user/gps');
  const [lang, setLang] = React.useState('fr');
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  // Move useState inside the component
  const [toggles, setToggles] = React.useState({
    toggle1: false,
    toggle2: false,
    toggle3: false,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (value: string) => {
    setLang(value);
    console.log('Fiteny voafidy:', value);
    // Afaka manao i18n language change eto
  };

  // Get current language info
  const currentLanguage = getDefaultLanguage(lang);

  if (!ready) return null;

  return (
    <>
      {/* Title Section */}
      <div className={styles.auth_reca3}>
        <motion.h2
          className={styles.auth_reca4}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Faites-le à votre façon
        </motion.h2>
        <motion.p
          className={styles.auth_reca5}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Sélectionnez vos modes de transport favoris et activez le thème
          <br className={styles.auth_reca6} />
          sombre si vous préférez une expérience plus douce pour les yeux.
        </motion.p>
      </div>

      {/* Main Content */}
      <div className={styles.auth_reca7}>
        <div className={styles.auth_reca8}>
          <div className={styles.auth_reca28}>
            <div>
              <ToggleSwitch isOn={toggles.toggle1} onToggle={() => handleToggle('toggle1')} />
            </div>
            <div className={styles.auth_reca29}>
              <label htmlFor="">GPS</label>
            </div>
          </div>
          <div className={styles.auth_reca30}>
            <div>
              <ToggleSwitch isOn={toggles.toggle2} onToggle={() => handleToggle('toggle2')} />
            </div>
            <div className={styles.auth_reca31}>
              <label htmlFor="">Notification</label>
            </div>
          </div>
        </div>
        {/* Theme Section */}
        <div className={styles.auth_reca9}>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={styles.auth_reca10}
          >
            Thème
          </motion.h3>
        </div>
        <div className={styles.auth_reca11}>
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
              claire
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
              sombre
            </label>
          </motion.div>
        </div>

        {/* Form Section */}
        <div className={styles.auth_reca12}>
          <form>
            {/* Transport Type */}
            <div className={styles.auth_reca13}>
              <label className={styles.auth_reca14}>Type de transport</label>
              <MultiSelect
                options={options}
                value={selectedValues}
                onValueChange={setSelectedValues}
                placeholder="types de transport"
                className={styles.auth_reca15}
              />
            </div>

            {/* Language Selection with Scrollable Dropdown */}
            <div className={styles.auth_reca16}>
              <label htmlFor="lang-select" className={styles.auth_reca17}>
                Langue
              </label>
              <Select value={lang} onValueChange={handleChange}>
                <SelectTrigger id="lang-select" size="default" className={styles.auth_reca18}>
                  <SelectValue>
                    <div className={styles.auth_reca19}>
                      <img
                        src={currentLanguage.flag}
                        alt={currentLanguage.alt}
                        className={styles.auth_reca20}
                        loading="lazy"
                      />
                      <span className={styles.auth_reca21}>{currentLanguage.name}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>

                {/* Scrollable Content avec max height */}
                <SelectContent className={styles.auth_reca22}>
                  {languages.map(language => (
                    <SelectItem
                      key={language.code}
                      value={language.code}
                      className={styles.auth_reca23}
                    >
                      <div className={styles.auth_reca24}>
                        <img
                          src={language.flag}
                          alt={language.alt}
                          className={styles.auth_reca25}
                          loading="lazy"
                        />
                        <span className={styles.auth_reca26}>{language.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
      </div>
      {/* Action Buttons */}
      <div className={styles.auth_reca27}>
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
            Plus tard
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
            Valider
          </Button>
        </motion.div>
      </div>
    </>
  );
}
