'use client';
import React, { useRef, useState, useEffect } from 'react';

type PhotoCaptureProps = {
  onCapture?: (image: string) => void; // <- ✅ Ajout de la prop
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
    stream?.getTracks().forEach((track) => track.stop());
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

        // ✅ Appelle la fonction onCapture si elle est fournie
        if (onCapture) onCapture(dataUrl);

        stopCamera();
      }
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
    startCamera();
  };

  // Arrêt caméra si le composant est démonté
  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div>
      {!photo && (
        <>
          <div>
            <video ref={videoRef} style={{ width: '100%', maxWidth: 400 }} />
          </div>
          {!streaming ? (
            <button onClick={startCamera}>Démarrer la caméra</button>
          ) : (
            <button onClick={capturePhoto}>Prendre une photo</button>
          )}
        </>
      )}

      {photo && (
        <>
          <div>
            <img src={photo} alt="Aperçu" style={{ width: '100%', maxWidth: 400 }} />
          </div>
          <button onClick={retakePhoto}>Reprendre une autre photo</button>
        </>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
