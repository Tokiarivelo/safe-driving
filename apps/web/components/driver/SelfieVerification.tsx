'use client';

import React, { useState } from 'react';
import PhotoCapture from '@/components/ui/Camera';

export default function SelfieVerification({
  onUpdate,
}: {
  onUpdate: (data: any) => void;
}) {
  const [selfie, setSelfie] = useState<string | null>(null);

  const handleCapture = (image: string) => {
    setSelfie(image);
    onUpdate({ selfie: image });
  };

  return (
    <div className="flex justify-center">
      <PhotoCaptureWithCallback onCapture={handleCapture} />
    </div>
  );
}

// Wrapper du composant PhotoCapture pour injecter la fonction onCapture
function PhotoCaptureWithCallback({
  onCapture,
}: {
  onCapture: (image: string) => void;
}) {
  const [photo, setPhoto] = useState<string | null>(null);

  return (
    <PhotoCapture
      // On capture est déclenché en interne, on synchronise ici
      onCapture={(image: string) => {
        setPhoto(image);
        onCapture(image);
      }}
    />
  );
}
