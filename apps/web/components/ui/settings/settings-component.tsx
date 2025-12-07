'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import styles from './settings.module.css';
import { useMeQuery, useUpdateUserMutation, useUpsertUserPreferenceMutation } from '@/graphql/generated/graphql';
import { Icon } from '@iconify/react';

type TabType = 'profile' | 'vehicle' | 'preference';

export interface SettingsComponentProps {
  variant: 'user' | 'driver';
}

export default function SettingsComponent({ variant }: SettingsComponentProps) {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  
  // Form states for profile tab
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sex, setSex] = useState('');
  const [language, setLanguage] = useState('fr');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [description, setDescription] = useState('');

  // Form states for vehicle tab (driver only)
  const [vehicleType, setVehicleType] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [baggageVolume, setBaggageVolume] = useState('');
  const [baggageWeight, setBaggageWeight] = useState('');
  const [maxSpeed, setMaxSpeed] = useState('');
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [babySeat, setBabySeat] = useState(false);
  const [pmrAccessibility, setPmrAccessibility] = useState(false);
  const [otherDescriptions, setOtherDescriptions] = useState('');

  // Form states for preferences tab
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [appLanguage, setAppLanguage] = useState('fr');
  const [theme, setTheme] = useState('dark');

  const { data: meData, refetch: refetchMe } = useMeQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [updateUser, { loading: updateUserLoading }] = useUpdateUserMutation();
  const [upsertUserPreference, { loading: updatePrefLoading }] = useUpsertUserPreferenceMutation();

  const isDriver = variant === 'driver';
  const user = meData?.me;

  // Load user data
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setDateOfBirth(user.dateOfBirth || '');
      setSex(user.sex || '');
      setLanguage(user.language || 'fr');
      setDescription(user.bio || '');

      // Load preferences - using the actual schema field names
      if (user.userPreference) {
        setGpsEnabled(user.userPreference.activateLocation ?? true);
        setNotificationsEnabled(user.userPreference.activateNotifications ?? true);
        setAppLanguage(user.userPreference.language || 'fr');
        setTheme(user.userPreference.theme || 'dark');
      }

      // Load vehicle data for drivers
      if (isDriver && user.vehicles && user.vehicles.length > 0) {
        const vehicle = user.vehicles[0];
        setBrand(vehicle.brand || '');
        setModel(vehicle.model || '');
        setRegistrationNumber(vehicle.registrationNumber || '');
        setVehicleType(vehicle.vehicleType?.id || '');
        // Additional vehicle fields would be loaded here if available in schema
      }
    }
  }, [user, isDriver]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateUser({
        variables: {
          input: {
            firstName: { set: firstName },
            lastName: { set: lastName },
            email: { set: email },
            phone: { set: phone },
            dateOfBirth: dateOfBirth ? { set: dateOfBirth } : undefined,
            sex: sex ? { set: sex } : undefined,
            language: { set: language },
            bio: { set: description },
          },
        },
      });

      toast.success('Profil mis à jour avec succès');
      refetchMe();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Erreur lors de la mise à jour du profil');
    }
  };

  const handleVehicleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vehicle update logic would go here
    toast.success('Véhicule mis à jour avec succès');
  };

  const handlePreferencesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await upsertUserPreference({
        variables: {
          input: {
            activateLocation: gpsEnabled,
            activateNotifications: notificationsEnabled,
            language: appLanguage,
            theme,
          },
        },
      });

      toast.success('Préférences mises à jour avec succès');
      refetchMe();
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast.error('Erreur lors de la mise à jour des préférences');
    }
  };

  const renderProfileTab = () => (
    <form onSubmit={handleProfileSubmit} className={styles.formSection}>
      <div className={styles.formGrid}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <Icon icon="mdi:account-outline" className={styles.inputIcon} />
              <input
                type="text"
                placeholder="Firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <Icon icon="mdi:account-outline" className={styles.inputIcon} />
              <input
                type="text"
                placeholder="Lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <Icon icon="mdi:email-outline" className={styles.inputIcon} />
            <input
              type="email"
              placeholder="e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <Icon icon="mdi:phone-outline" className={styles.inputIcon} />
            <input
              type="tel"
              placeholder="N° de téléphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <Icon icon="mdi:calendar-outline" className={styles.inputIcon} />
            <input
              type="date"
              placeholder="Date de naissance"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.selectWrapper}>
            <Icon icon="mdi:gender-male-female" className={styles.inputIcon} />
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className={styles.select}
            >
              <option value="">Sexe</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
              <option value="other">Autre</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.selectWrapper}>
            <Icon icon="mdi:translate" className={styles.inputIcon} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={styles.select}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="mg">Malagasy</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <Icon icon="mdi:lock-outline" className={styles.inputIcon} />
            <input
              type="password"
              placeholder="Ancien mot de passe"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <Icon icon="mdi:lock-outline" className={styles.inputIcon} />
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <Icon icon="mdi:lock-outline" className={styles.inputIcon} />
            <input
              type="password"
              placeholder="Confirmer le nouveau mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <Icon icon="mdi:text-box-outline" className={styles.inputIcon} />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              style={{ border: 'none', padding: 0 }}
            />
          </div>
        </div>

        <button type="submit" className={styles.submitButton} disabled={updateUserLoading}>
          {updateUserLoading ? 'Chargement...' : 'Valider'}
        </button>
      </div>
    </form>
  );

  const renderVehicleTab = () => (
    <form onSubmit={handleVehicleSubmit} className={styles.formSection}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <Icon icon="mdi:car-outline" className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Type de véhicule"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <Icon icon="mdi:tag-outline" className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Marque"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <Icon icon="mdi:car-side" className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Modèle"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <Icon icon="mdi:card-text-outline" className={styles.inputIcon} />
            <input
              type="text"
              placeholder="N° d'immatriculation"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <Icon icon="mdi:bag-suitcase-outline" className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Volume de baggage accepté"
              value={baggageVolume}
              onChange={(e) => setBaggageVolume(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <Icon icon="mdi:weight" className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Poids du baggage accepté"
              value={baggageWeight}
              onChange={(e) => setBaggageWeight(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.numberInputGroup}>
            <div className={styles.inputWrapper} style={{ flex: 1 }}>
              <Icon icon="mdi:speedometer" className={styles.inputIcon} />
              <input
                type="number"
                placeholder="Vitesse maximale"
                value={maxSpeed}
                onChange={(e) => setMaxSpeed(e.target.value)}
                className={styles.input}
              />
            </div>
            <span className={styles.unit}>Km/h</span>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <div className={styles.checkboxItem}>
            <input
              type="checkbox"
              id="pets"
              checked={petsAllowed}
              onChange={(e) => setPetsAllowed(e.target.checked)}
              className={styles.checkbox}
            />
            <label htmlFor="pets" className={styles.checkboxLabel}>
              Animaux acceptés
            </label>
          </div>

          <div className={styles.checkboxItem}>
            <input
              type="checkbox"
              id="babySeat"
              checked={babySeat}
              onChange={(e) => setBabySeat(e.target.checked)}
              className={styles.checkbox}
            />
            <label htmlFor="babySeat" className={styles.checkboxLabel}>
              Siège bébé
            </label>
          </div>

          <div className={styles.checkboxItem}>
            <input
              type="checkbox"
              id="pmr"
              checked={pmrAccessibility}
              onChange={(e) => setPmrAccessibility(e.target.checked)}
              className={styles.checkbox}
            />
            <label htmlFor="pmr" className={styles.checkboxLabel}>
              Accessibilité PMR
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <textarea
            placeholder="Autre descriptions"
            value={otherDescriptions}
            onChange={(e) => setOtherDescriptions(e.target.value)}
            className={styles.textarea}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Valider
        </button>
      </div>
    </form>
  );

  const renderPreferencesTab = () => (
    <form onSubmit={handlePreferencesSubmit} className={styles.formSection}>
      <div className={styles.formGrid}>
        <div className={styles.preferenceItem}>
          <span className={styles.preferenceLabel}>GPS</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={gpsEnabled}
              onChange={(e) => setGpsEnabled(e.target.checked)}
              className={styles.switchInput}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.preferenceItem}>
          <span className={styles.preferenceLabel}>Notifications</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className={styles.switchInput}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.preferenceLabel}>Langue de l'application</label>
          <div className={styles.selectWrapper}>
            <Icon icon="mdi:translate" className={styles.inputIcon} />
            <select
              value={appLanguage}
              onChange={(e) => setAppLanguage(e.target.value)}
              className={styles.select}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="mg">Malagasy</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.preferenceLabel}>Thème</label>
          <div className={styles.themeSelector}>
            <label
              className={`${styles.themeOption} ${theme === 'light' ? styles.themeOptionActive : ''}`}
            >
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === 'light'}
                onChange={(e) => setTheme(e.target.value)}
                className={styles.radioInput}
              />
              <span>Claire</span>
            </label>
            <label
              className={`${styles.themeOption} ${theme === 'dark' ? styles.themeOptionActive : ''}`}
            >
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
                onChange={(e) => setTheme(e.target.value)}
                className={styles.radioInput}
              />
              <span>Sombre</span>
            </label>
          </div>
        </div>

        <button type="submit" className={styles.submitButton} disabled={updatePrefLoading}>
          {updatePrefLoading ? 'Chargement...' : 'Valider'}
        </button>
      </div>
    </form>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'vehicle':
        return renderVehicleTab();
      case 'preference':
        return renderPreferencesTab();
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {user?.avatar?.url && (
          <Image
            src={user.avatar.url}
            alt="Profile"
            width={60}
            height={60}
            className={styles.profilePic}
          />
        )}
        <h1 className={styles.title}>Paramètres et Préférences</h1>
      </div>

      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tab} ${activeTab === 'profile' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        {isDriver && (
          <button
            className={`${styles.tab} ${activeTab === 'vehicle' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('vehicle')}
          >
            Véhicule
          </button>
        )}
        <button
          className={`${styles.tab} ${activeTab === 'preference' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('preference')}
        >
          Préférence
        </button>
      </div>

      {renderTabContent()}
    </div>
  );
}
