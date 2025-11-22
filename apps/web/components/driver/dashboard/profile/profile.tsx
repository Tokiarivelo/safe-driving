'use client';

import LeftSidebarMenu from '../sidebare/left-sidebar-menu';
import React, { useRef, useState } from 'react';
import {
  useMeQuery,
  useGetqrQuery,
  useUploadAvatarMutation,
  useUploadCoverMutation,
  useUploadUserImagesMutation,
  useCreateBatchPresignedUrlsMutation,
  useCompleteUploadBulkMutation,
  FileType,
} from '@/graphql/generated/graphql';
import { uploadMultipleWithLimit } from '@/components/ui/upload/upload-component.service';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import styles from './profile.module.css';

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const {
    data: meData,
    loading: meLoading,
    refetch: refetchMe,
  } = useMeQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { data: qrData, loading: qrLoading } = useGetqrQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [uploadAvatar] = useUploadAvatarMutation();
  const [uploadCover] = useUploadCoverMutation();
  const [uploadUserImages] = useUploadUserImagesMutation();
  const [createBatchPresignedUrls] = useCreateBatchPresignedUrlsMutation();
  const [completeUploadBulk] = useCompleteUploadBulkMutation();

  const handleProfileClick = () => {
    profileInputRef.current?.click();
  };

  const handleCoverClick = () => {
    coverInputRef.current?.click();
  };

  const handleGalleryClick = () => {
    galleryInputRef.current?.click();
  };

  const handleProfileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      try {
        const fileMeta = {
          originalName: file.name,
          contentType: file.type || 'application/octet-stream',
          uniqueId: uuidv4(),
        };

        const { data: presignedData } = await createBatchPresignedUrls({
          variables: {
            files: [fileMeta],
            type: FileType.USER,
          },
        });

        if (!presignedData?.createBatchPresignedUrls) {
          throw new Error("Impossible de générer une URL d'upload");
        }

        const results = await uploadMultipleWithLimit(
          presignedData.createBatchPresignedUrls,
          [file],
          () => {},
          1,
          1,
        );

        const successResults = results.filter(r => r.success);
        if (successResults.length === 0) {
          throw new Error("L'upload de la photo a échoué");
        }

        await completeUploadBulk({
          variables: {
            keys: successResults.map(r => r.key || ''),
            type: FileType.USER,
          },
        });

        await uploadAvatar({
          variables: {
            key: successResults[0].key || '',
          },
        });

        refetchMe();
      } catch (error: any) {
        console.error('Upload failed:', error);
        toast.error(error.message || "Erreur lors de l'upload de la photo");
        setProfileImage(null);
      }
    }
  };

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);

      try {
        const fileMeta = {
          originalName: file.name,
          contentType: file.type || 'application/octet-stream',
          uniqueId: uuidv4(),
        };

        const { data: presignedData } = await createBatchPresignedUrls({
          variables: {
            files: [fileMeta],
            type: FileType.USER,
          },
        });

        if (!presignedData?.createBatchPresignedUrls) {
          throw new Error("Impossible de générer une URL d'upload");
        }

        const results = await uploadMultipleWithLimit(
          presignedData.createBatchPresignedUrls,
          [file],
          () => {},
          1,
          1,
        );

        const successResults = results.filter(r => r.success);
        if (successResults.length === 0) {
          throw new Error("L'upload de la couverture a échoué");
        }

        await completeUploadBulk({
          variables: {
            keys: successResults.map(r => r.key || ''),
            type: FileType.USER,
          },
        });

        await uploadCover({
          variables: {
            key: successResults[0].key || '',
          },
        });

        refetchMe();
      } catch (error: any) {
        console.error('Upload failed:', error);
        toast.error(error.message || "Erreur lors de l'upload de la couverture");
        setCoverImage(null);
      }
    }
  };

  const handleGalleryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setGalleryImages(prev => [...prev, ...files]);

      try {
        const fileMetas = files.map(file => ({
          originalName: file.name,
          contentType: file.type || 'application/octet-stream',
          uniqueId: uuidv4(),
        }));

        const { data: presignedData } = await createBatchPresignedUrls({
          variables: {
            files: fileMetas,
            type: FileType.USER,
          },
        });

        if (!presignedData?.createBatchPresignedUrls) {
          throw new Error("Impossible de générer les URLs d'upload");
        }

        const results = await uploadMultipleWithLimit(
          presignedData.createBatchPresignedUrls,
          files,
          () => {},
          files.length,
          files.length,
        );

        const successResults = results.filter(r => r.success);
        if (successResults.length === 0) {
          throw new Error("L'upload des photos a échoué");
        }

        await completeUploadBulk({
          variables: {
            keys: successResults.map(r => r.key || ''),
            type: FileType.USER,
          },
        });

        await uploadUserImages({
          variables: {
            keys: successResults.map(r => r.key || ''),
          },
        });

        refetchMe();
      } catch (error: any) {
        console.error('Upload failed:', error);
        toast.error(error.message || "Erreur lors de l'upload des photos");
        setGalleryImages([]);
      }
    }
  };

  if (meLoading) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  const user = meData?.me;
  const userImages = user?.UserImage || [];
  const userCover = user?.UserCover;

  return (
    <div className={styles.container}>
      <LeftSidebarMenu />

      <div className={styles.mainContent}>
        {/* Bannière pleine largeur en haut */}
        <div
          className={styles.coverSection}
          style={{
            backgroundImage: coverImage
              ? `url('${coverImage}')`
              : userCover?.file?.url
                ? `url('${userCover.file.url}')`
                : 'none',
          }}
        >
          <button className={styles.coverUploadButton} onClick={handleCoverClick}>
            Upload Cover
          </button>
        </div>

        {/* Contenu principal en deux colonnes */}
        <div className={styles.contentGrid}>
          {/* Colonne de gauche (1/3) - Profil et infos */}
          <div className={styles.leftColumn}>
            <div className={styles.profileSection}>
              <div className={styles.profileImageContainer} onClick={handleProfileClick}>
                {profileImage ? (
                  <img src={profileImage} alt="Profil" className={styles.profileImage} />
                ) : user?.avatar?.url ? (
                  <img src={user.avatar.url} alt="Profil" className={styles.profileImage} />
                ) : (
                  <div className={styles.uploadPlaceholder}>+ Upload</div>
                )}
              </div>

              <div className={styles.userInfo}>
                <h2 className={styles.userName}>
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className={styles.userContact}>{user?.phone || user?.username}</p>
                <p className={styles.rating}>⭐ 4.2</p>

                {qrLoading ? (
                  <div className={styles.qrLoading}>Loading QR...</div>
                ) : qrData?.getUserQr ? (
                  <div className={styles.qrContainer}>
                    <img src={qrData.getUserQr} alt="QR Code" className={styles.qrImage} />
                  </div>
                ) : (
                  <div className={styles.qrUnavailable}>QR Code not available</div>
                )}
              </div>
            </div>

            <input
              ref={profileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfileChange}
              className={styles.hiddenInput}
            />
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className={styles.hiddenInput}
            />
          </div>

          {/* Colonne de droite (2/3) - Galerie */}
          <div className={styles.rightColumn}>
            <div className={styles.gallerySection}>
              <div className={styles.galleryHeader}>
                <h3 className={styles.galleryTitle}>Mes Photos</h3>
                <button className={styles.uploadButton} onClick={handleGalleryClick}>
                  Upload Photos
                </button>
              </div>
              <div className={styles.galleryGrid}>
                {userImages.map(image => (
                  <img
                    key={image.id}
                    src={image.file.url || ''}
                    alt="User Image"
                    className={styles.galleryImage}
                  />
                ))}
              </div>
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
                className={styles.hiddenInput}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
