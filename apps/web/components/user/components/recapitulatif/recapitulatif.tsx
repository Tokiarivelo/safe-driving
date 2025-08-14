'use client';

import Image from 'next/image';
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
import {
  Code2, // React
  Palette, // Vue
  Settings, // Angular
  Zap, // Svelte
  Monitor, // Next.js
} from 'lucide-react';

// Options pour MultiSelect
const options = [
  {
    value: 'react',
    label: 'React',
    icon: <Code2 size={14} className="text-white" />,
  },
  {
    value: 'vue',
    label: 'Vue.js',
    icon: <Palette size={14} className="text-white" />,
  },
  {
    value: 'angular',
    label: 'Angular',
    icon: <Settings size={14} className="text-white" />,
  },
  {
    value: 'svelte',
    label: 'Svelte',
    icon: <Zap size={14} className="text-white" />,
  },
  {
    value: 'nextjs',
    label: 'Next.js',
    icon: <Monitor size={14} className="text-white" />,
  },
];

// Array ny languages miaraka amin'ny sary
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
  return languages.find((lang) => lang.code === langCode) || languages[0];
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
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (value: string) => {
    setLang(value);
    console.log('Fiteny voafidy:', value);
    // Afaka manao i18n language change eto
  };

  // Get current language info
  const currentLanguage = getDefaultLanguage(lang);

  if (!ready) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-pink-500">Miandry ny fandikana...</p>
      </div>
    );
  }

  return (
    <>
      {/* Header Logo */}
      <div className="w-full h-20 flex sm:h-23">
        <Image
          src={'/logo.svg'}
          alt="logo"
          width={100}
          height={100}
          priority={true}
          blurDataURL=""
          className="h-15 w-auto mt-2 ml-6 sm:h-20"
        />
      </div>

      {/* Title Section */}
      <div className="w-full h-26 text-center sm:h-26 md:px-8">
        <h2 className="font-semibold text-[#822072] mb-2 sm:mb-1 lg:mb-5 sm:text-lg lg:text-xl">
          Faites-le à votre façon
        </h2>
        <p className="text-[#B15C8B] leading-relaxed sm:text-sm lg:text-[16px]">
          Sélectionnez vos modes de transport favoris et activez le thème <br className="sm:hidden" />
          sombre si vous préférez une expérience plus douce pour les yeux.
        </p>
      </div>

      {/* Main Content */}
      <div className="sm:px-7 md:px-10 lg:px-25">
        <div className="w-full flex flex-col gap-3 lg:pl-10">
            <ToggleSwitch isOn={toggles.toggle1} onToggle={() => handleToggle('toggle1')} />
            <ToggleSwitch isOn={toggles.toggle2} onToggle={() => handleToggle('toggle2')} />
        </div>      
        {/* Theme Section */}
        <div className="w-full h-5 flex items-center">
          <h3 className="text-sm font-medium text-[#B15C8B] lg:ml-10">Thème</h3>
        </div>
        <div className="w-full h-8 flex items-center justify-center sm:space-x-30 md:space-x-48 lg:space-x-34">
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
              onChange={(e) => setSize(e.target.value)}
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
              onChange={(e) => setSize(e.target.value)}
            />
            <label htmlFor="Actuve" className={styles.auth_not10}>
              sombre
            </label>
          </motion.div>
        </div>

        {/* Form Section */}
        <div className="w-full h-40 lg:px-10">
          <form>
            {/* Transport Type */}
            <div className="flex flex-col space-y-1">
              <label className="mb-2 text-[#b15c8b] text-sm font-medium">Type de transport</label>
              <MultiSelect
                options={options}
                value={selectedValues}
                onValueChange={setSelectedValues}
                placeholder="types de transport"
                className="mb-2"
              />
            </div>

            {/* Language Selection with Scrollable Dropdown */}
            <div className="space-y-1">
              <label htmlFor="lang-select" className="block text-sm font-medium text-[#b15c8b]">
                Langue
              </label>
              <Select value={lang} onValueChange={handleChange}>
                <SelectTrigger
                  id="lang-select"
                  size="default"
                  className="w-full border border-pink-400 bg-[#fadbf0] rounded-sm px-3 py-5 flex items-center gap-2 hover:bg-[#f5d0e8] transition-colors"
                >
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <img
                        src={currentLanguage.flag}
                        alt={currentLanguage.alt}
                        className="h-4 w-6 rounded-sm object-cover"
                        loading="lazy"
                      />
                      <span className="truncate text-[#b15c8b]">{currentLanguage.name}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>

                {/* Scrollable Content avec max height */}
                <SelectContent className="max-h-[250px] overflow-y-auto">
                  {languages.map((language) => (
                    <SelectItem
                      key={language.code}
                      value={language.code}
                      className="hover:bg-[#fadbf0] focus:bg-[#fadbf0] cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={language.flag}
                          alt={language.alt}
                          className="h-4 w-6 rounded-sm object-cover"
                          loading="lazy"
                        />
                        <span className="truncate text-[#b15c8b]">{language.name}</span>
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
      <div className="w-full h-10 lg:flex sm:px-7 md:px-10 space-x-25 justify-center items-center mt-2">
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
          transition={ { duration: 0.5,  delay: 0.3 }}
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