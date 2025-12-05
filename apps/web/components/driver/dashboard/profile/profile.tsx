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

type TabType = 'a_propos' | 'photos' | 'avis_recus' | 'avis_laisses';
type PhotoSubTab = 'mes_photos' | 'vehicule';

// Default rating values when no reviews exist
const DEFAULT_RATING = 4.2;
const DEFAULT_VOTE_COUNT = 100;

// Local types for when GraphQL types are not available
interface Review {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
  reviewer?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    avatar?: {
      url?: string | null;
    } | null;
  } | null;
}

interface UserImage {
  id: string;
  file: {
    url?: string | null;
  };
}

interface VehicleImage {
  id: string;
  file: {
    id: string;
    url?: string | null;
    key: string;
    originalName: string;
  };
}

interface Vehicle {
  id: string;
  VehicleImage?: VehicleImage[] | null;
}

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('photos');
  const [photoSubTab, setPhotoSubTab] = useState<PhotoSubTab>('mes_photos');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
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

  // Calculate rating from reviews (uses DEFAULT_RATING and DEFAULT_VOTE_COUNT when no reviews)
  const calculateRating = () => {
    const reviews = user?.review as Review[] | undefined;
    if (!reviews || reviews.length === 0) {
      return { value: DEFAULT_RATING, count: DEFAULT_VOTE_COUNT };
    }
    const total = reviews.reduce((acc: number, r: Review) => acc + r.rating, 0);
    return { value: total / reviews.length, count: reviews.length };
  };

  // Render star rating (displays full stars for integer values, half for decimals >= 0.5)
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
        // Half star - we show it as a full star since there's no half character
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
  const userImages = (user?.UserImage || []) as UserImage[];
  const userCover = user?.UserCover;
  const vehicles = (user?.vehicles || []) as Vehicle[];
  const rating = calculateRating();

  // Get valid images for current sub-tab
  const getValidImages = (): string[] => {
    if (photoSubTab === 'mes_photos') {
      return userImages
        .filter((image: UserImage) => image.file.url)
        .map((image: UserImage) => image.file.url!);
    }
    return vehicles
      .flatMap((v: Vehicle) => v.VehicleImage || [])
      .filter((image: VehicleImage) => image.file.url)
      .map((image: VehicleImage) => image.file.url!);
  };

  // Lightbox handlers
  const handleImageClick = (images: string[], index: number) => {
    setLightboxImages(images);
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev: number) => (prev > 0 ? prev - 1 : lightboxImages.length - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev: number) => (prev < lightboxImages.length - 1 ? prev + 1 : 0));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const renderPhotoSubContent = () => {
    if (photoSubTab === 'mes_photos') {
      const validImages = userImages.filter((image: UserImage) => image.file.url);
      const imageUrls = validImages.map((image: UserImage) => image.file.url!);
      return validImages.length > 0 ? (
        <div className={styles.galleryGrid}>
          {validImages.map((image: UserImage, index: number) => (
            <div
              key={image.id}
              className={styles.galleryImageContainer}
              onClick={() => handleImageClick(imageUrls, index)}
            >
              <Image
                src={image.file.url!}
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
      );
    }

    // Vehicle photos
    const vehicleImages = vehicles
      .flatMap((v: Vehicle) => v.VehicleImage || [])
      .filter((image: VehicleImage) => image.file.url);
    const imageUrls = vehicleImages.map((image: VehicleImage) => image.file.url!);
    return vehicleImages.length > 0 ? (
      <div className={styles.galleryGrid}>
        {vehicleImages.map((image: VehicleImage, index: number) => (
          <div
            key={image.id}
            className={styles.galleryImageContainer}
            onClick={() => handleImageClick(imageUrls, index)}
          >
            <Image
              src={image.file.url!}
              alt="Vehicle Image"
              className={styles.galleryImage}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          </div>
        ))}
      </div>
    ) : (
      <div className={styles.emptyState}>
        <p>Aucune photo de véhicule disponible</p>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'a_propos':
        return (
          <div className={styles.aboutSection}>
            <div className={styles.aboutCard}>
              <p className={styles.aboutText}>
                {user?.bio || "« Passionné de la route depuis 10 ans, votre confort et votre sécurité sont ma priorité. »"}
              </p>
            </div>
          </div>
        );
      case 'photos':
        return (
          <>
            <div className={styles.subTabsContainer}>
              <button
                className={`${styles.subTab} ${photoSubTab === 'mes_photos' ? styles.subTabActive : ''}`}
                onClick={() => setPhotoSubTab('mes_photos')}
              >
                Mes photos
              </button>
              <button
                className={`${styles.subTab} ${photoSubTab === 'vehicule' ? styles.subTabActive : ''}`}
                onClick={() => setPhotoSubTab('vehicule')}
              >
                Véhicule
              </button>
            </div>
            <div className={styles.gallerySection}>{renderPhotoSubContent()}</div>
          </>
        );
      case 'avis_recus':
        return (
          <div className={styles.reviewsSection}>
            {user?.review && user.review.length > 0 ? (
              <>
                <div className={styles.reviewsGrid}>
                  {(user.review as Review[]).map((review: Review) => (
                    <div key={review.id} className={styles.reviewCard}>
                      <div className={styles.reviewHeader}>
                        <div className={styles.reviewerAvatar}>
                          {review.reviewer?.avatar?.url ? (
                            <Image
                              src={review.reviewer.avatar.url}
                              alt={`${review.reviewer.firstName || 'Reviewer'}`}
                              width={48}
                              height={48}
                              className={styles.reviewerAvatarImage}
                            />
                          ) : (
                            <div className={styles.reviewerAvatarPlaceholder}>
                              {review.reviewer?.firstName?.charAt(0) || '?'}
                            </div>
                          )}
                        </div>
                        <div className={styles.reviewerInfo}>
                          <span className={styles.reviewerName}>
                            {review.reviewer?.firstName || 'Anonyme'} {review.reviewer?.lastName?.charAt(0) || ''}.
                          </span>
                          <span className={styles.reviewDate}>
                            {new Date(review.createdAt).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                      <div className={styles.reviewRating}>
                        {'★'.repeat(review.rating)}
                        {'☆'.repeat(5 - review.rating)}
                      </div>
                      <p className={styles.reviewContent}>{review.content}</p>
                    </div>
                  ))}
                </div>
                <div className={styles.loadMoreContainer}>
                  <button className={styles.loadMoreButton}>Charger plus</button>
                </div>
              </>
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
                      <span>📞</span>
                      <span>{user.phone}</span>
                    </div>
                  )}
                  {user?.email && (
                    <div className={styles.contactItem}>
                      <span>✉️</span>
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
                className={`${styles.tab} ${activeTab === 'a_propos' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('a_propos')}
              >
                A propos
              </button>
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

        {/* Image Lightbox Dialog */}
        <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
          <DialogContent className={styles.lightboxDialog} showCloseButton={false}>
            {lightboxImages.length > 0 && (
              <div className={styles.lightboxContainer}>
                {/* Close button */}
                <button
                  className={styles.lightboxCloseButton}
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Fermer"
                >
                  ×
                </button>

                {/* Main image container */}
                <div className={styles.lightboxMainImage}>
                  {/* Previous button */}
                  <button
                    className={styles.lightboxNavButton}
                    onClick={handlePrevImage}
                    aria-label="Image précédente"
                  >
                    ‹
                  </button>

                  {/* Current image */}
                  <div className={styles.lightboxImageWrapper}>
                    <Image
                      src={lightboxImages[selectedImageIndex] || ''}
                      alt={`Image ${selectedImageIndex + 1}`}
                      fill
                      className={styles.lightboxImage}
                      sizes="90vw"
                    />
                  </div>

                  {/* Next button */}
                  <button
                    className={styles.lightboxNavButton}
                    onClick={handleNextImage}
                    aria-label="Image suivante"
                  >
                    ›
                  </button>
                </div>

                {/* Thumbnails strip */}
                <div className={styles.lightboxThumbnails}>
                  {lightboxImages.map((imageUrl: string, index: number) => (
                    <button
                      key={index}
                      className={`${styles.lightboxThumbnail} ${index === selectedImageIndex ? styles.lightboxThumbnailActive : ''}`}
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <Image
                        src={imageUrl}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        sizes="100px"
                        className={styles.lightboxThumbnailImage}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
