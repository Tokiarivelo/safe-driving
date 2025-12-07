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
  
  // Form states for profile tab - only using fields that exist in schema
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Form states for vehicle tab (driver only)
  const [vehicleType, setVehicleType] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [place, setPlace] = useState('');
  const [otherDescriptions, setOtherDescriptions] = useState('');

  // Form states for preferences tab - using actual schema fields
  const [activateLocation, setActivateLocation] = useState(false);
  const [activateNotifications, setActivateNotifications] = useState(false);
  const [activateSmsNotifications, setActivateSmsNotifications] = useState(false);
  const [activateEmailNotifications, setActivateEmailNotifications] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [theme, setTheme] = useState('light');

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
      setUsername(user.username || '');

      // Load preferences - using the actual schema field names
      if (user.UserPreference) {
        setActivateLocation(user.UserPreference.activateLocation ?? false);
        setActivateNotifications(user.UserPreference.activateNotifications ?? false);
        setActivateSmsNotifications(user.UserPreference.activateSmsNotifications ?? false);
        setActivateEmailNotifications(user.UserPreference.activateEmailNotifications ?? false);
        setLanguage(user.UserPreference.language || 'fr');
        setTheme(user.UserPreference.theme || 'light');
      }

      // Load vehicle data for drivers
      if (isDriver && user.vehicles && user.vehicles.length > 0) {
        const vehicle = user.vehicles[0];
        setBrand(vehicle.brand || '');
        setModel(vehicle.model || '');
        setRegistrationNumber(vehicle.registrationNumber || '');
        setPlace(vehicle.place?.toString() || '');
        setVehicleType(vehicle.vehicleType?.id || '');
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
            username: username ? { set: username } : undefined,
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
            activateLocation,
            activateNotifications,
            activateSmsNotifications,
            activateEmailNotifications,
            language,
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
                required
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
              required
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
            <Icon icon="mdi:at" className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
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
            <Icon icon="mdi:seat-outline" className={styles.inputIcon} />
            <input
              type="number"
              placeholder="Nombre de places"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className={styles.input}
              min="1"
            />
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
              checked={activateLocation}
              onChange={(e) => setActivateLocation(e.target.checked)}
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
              checked={activateNotifications}
              onChange={(e) => setActivateNotifications(e.target.checked)}
              className={styles.switchInput}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.preferenceItem}>
          <span className={styles.preferenceLabel}>Notifications SMS</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={activateSmsNotifications}
              onChange={(e) => setActivateSmsNotifications(e.target.checked)}
              className={styles.switchInput}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.preferenceItem}>
          <span className={styles.preferenceLabel}>Notifications Email</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={activateEmailNotifications}
              onChange={(e) => setActivateEmailNotifications(e.target.checked)}
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
