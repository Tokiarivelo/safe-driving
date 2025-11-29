'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../driver/register/selfieVerif/selfieVerif.module.css';

type PhotoCaptureProps = {
  onCapture?: (image: string) => void;
};

export default function PhotoCapture({ onCapture }: PhotoCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [streaming, setStreaming] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreaming(true);
      }
    } catch (err) {
      console.error('Erreur accès caméra:', err);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setStreaming(false);
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setPhoto(dataUrl);

        if (onCapture) onCapture(dataUrl);

        stopCamera();
      }
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
    startCamera();
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className={styles.contentContainer}>
      {!photo && (
        <>
          <div>
            <video
              ref={videoRef}
              style={{ width: '100%', maxWidth: 400, borderRadius: '0.5rem' }}
            />
          </div>
          <div className={styles.buttonContainer}>
            {!streaming ? (
              <button className={styles.buttonOutline} onClick={startCamera}>
                Démarrer la caméra
              </button>
            ) : (
              <button className={styles.buttonPrimary} onClick={capturePhoto}>
                Prendre une photo
              </button>
            )}
          </div>
        </>
      )}

      {photo && (
        <>
          <div>
            <Image
              src={photo}
              alt="Aperçu"
              width={400}
              height={400}
              style={{ width: '100%', maxWidth: 400, borderRadius: '0.5rem' }}
              unoptimized
            />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.buttonOutline} onClick={retakePhoto}>
              Reprendre une photo
            </button>
          </div>
        </>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
