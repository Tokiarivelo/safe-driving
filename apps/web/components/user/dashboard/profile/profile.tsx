'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { UploadComponent } from '@/components/ui/upload/upload-component';
import styles from './profile.module.css';

type TabType = 'photos' | 'avis_recus' | 'avis_laisses';

export default function UserProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('photos');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

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

  const handleFabClick = () => {
    setIsUploadDialogOpen(true);
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
      } catch (error) {
        console.error('Upload failed:', error);
        toast.error(error instanceof Error ? error.message : "Erreur lors de l'upload de la photo");
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
      } catch (error) {
        console.error('Upload failed:', error);
        toast.error(
          error instanceof Error ? error.message : "Erreur lors de l'upload de la couverture",
        );
        setCoverImage(null);
      }
    }
  };

  const handleUploadComplete = async (results: Array<{ key?: string; success: boolean }>) => {
    const successResults = results.filter(r => r.success && r.key);
    if (successResults.length > 0) {
      try {
        await uploadUserImages({
          variables: {
            keys: successResults.map(r => r.key || ''),
          },
        });
        refetchMe();
        setIsUploadDialogOpen(false);
        toast.success('Photos uploadées avec succès');
      } catch (error) {
        console.error('Failed to save images:', error);
        toast.error("Erreur lors de l'enregistrement des photos");
      }
    }
  };

  // Calculate rating from reviews
  const calculateRating = () => {
    const reviews = user?.review;
    if (!reviews || reviews.length === 0) return { value: 4.2, count: 100 };
    const total = reviews.reduce((acc, r) => acc + r.rating, 0);
    return { value: total / reviews.length, count: reviews.length };
  };

  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className={styles.star}>
            ★
          </span>,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className={styles.star}>
            ★
          </span>,
        );
      } else {
        stars.push(
          <span key={i} className={styles.starEmpty}>
            ☆
          </span>,
        );
      }
    }
    return stars;
  };

  if (meLoading) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  const user = meData?.me;
  const userImages = user?.UserImage || [];
  const userCover = user?.UserCover;
  const rating = calculateRating();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'photos':
        return (
          <div className={styles.gallerySection}>
            {userImages.length > 0 ? (
              <div className={styles.galleryGrid}>
                {userImages.map(image => (
                  <div key={image.id} className={styles.galleryImageContainer}>
                    <Image
                      src={image.file.url || ''}
                      alt="User Image"
                      className={styles.galleryImage}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>Aucune photo disponible</p>
                <p>Cliquez sur le bouton + pour ajouter des photos</p>
              </div>
            )}
          </div>
        );
      case 'avis_recus':
        return (
          <div className={styles.reviewsSection}>
            {user?.review && user.review.length > 0 ? (
              user.review.map(review => (
                <div key={review.id} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewRating}>
                      {'★'.repeat(review.rating)}
                      {'☆'.repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p className={styles.reviewContent}>{review.content}</p>
                  <p className={styles.reviewDate}>
                    {new Date(review.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>Aucun avis reçu</p>
              </div>
            )}
          </div>
        );
      case 'avis_laisses':
        return (
          <div className={styles.reviewsSection}>
            <div className={styles.emptyState}>
              <p>Aucun avis laissé</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {/* Cover Section */}
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

        {/* Main Content Grid */}
        <div className={styles.contentGrid}>
          {/* Left Column - Profile Info */}
          <div className={styles.leftColumn}>
            <div className={styles.profileSection}>
              <div className={styles.profileImageContainer} onClick={handleProfileClick}>
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Profil"
                    className={styles.profileImage}
                    width={160}
                    height={160}
                  />
                ) : user?.avatar?.url ? (
                  <Image
                    src={user.avatar.url}
                    alt="Profil"
                    className={styles.profileImage}
                    width={160}
                    height={160}
                  />
                ) : (
                  <div className={styles.uploadPlaceholder}>+ Upload</div>
                )}
              </div>

              <div className={styles.userInfo}>
                <h2 className={styles.userName}>
                  {user?.firstName} {user?.lastName?.charAt(0)}.
                </h2>

                <div className={styles.ratingContainer}>
                  <span className={styles.ratingValue}>{rating.value.toFixed(1)}</span>
                  <div className={styles.ratingStars}>{renderStars(rating.value)}</div>
                </div>
                <p className={styles.ratingCount}>sur {rating.count} votes</p>

                <div className={styles.contactInfo}>
                  {user?.phone && (
                    <div className={styles.contactItem}>
                      <Image
                        src="/icons/phone.svg"
                        alt="Phone"
                        width={20}
                        height={20}
                        className={styles.contactIcon}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  {user?.email && (
                    <div className={styles.contactItem}>
                      <Image
                        src="/icons/email.svg"
                        alt="Email"
                        width={20}
                        height={20}
                        className={styles.contactIcon}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <span>{user.email}</span>
                    </div>
                  )}
                </div>

                {qrLoading ? (
                  <div className={styles.qrLoading}>Loading QR...</div>
                ) : qrData?.getUserQr ? (
                  <div className={styles.qrContainer}>
                    <Image
                      src={qrData.getUserQr}
                      alt="QR Code"
                      className={styles.qrImage}
                      width={120}
                      height={120}
                    />
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

          {/* Right Column - Tabs and Content */}
          <div className={styles.rightColumn}>
            <div className={styles.tabsContainer}>
              <button
                className={`${styles.tab} ${activeTab === 'photos' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('photos')}
              >
                Photos
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'avis_recus' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('avis_recus')}
              >
                Avis reçus
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'avis_laisses' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('avis_laisses')}
              >
                Avis laissés
              </button>
            </div>

            {renderTabContent()}
          </div>
        </div>

        {/* Floating Action Button */}
        <button className={styles.fab} onClick={handleFabClick} aria-label="Ajouter des photos">
          <span className={styles.fabIcon}>+</span>
        </button>

        {/* Upload Dialog */}
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogContent className={styles.uploadDialog}>
            <DialogHeader>
              <DialogTitle>Ajouter des photos</DialogTitle>
              <DialogDescription>
                Sélectionnez les photos que vous souhaitez ajouter à votre profil
              </DialogDescription>
            </DialogHeader>
            <div className={styles.uploadDialogContent}>
              <UploadComponent
                fileType={FileType.USER}
                onComplete={handleUploadComplete}
                onError={error => toast.error(error.message)}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
