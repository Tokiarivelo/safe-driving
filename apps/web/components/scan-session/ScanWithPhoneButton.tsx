'use client';

import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useScanSession } from '../../hooks/useScanSession';
import { Button } from '../ui/button';

const CREATE_SCAN_SESSION = gql`
  mutation CreateScanSession {
    createScanSession {
      sessionId
      qrBase64
    }
  }
`;

interface ScanWithPhoneButtonProps {
  onScanResult?: (scannedValue: string) => void;
  onSessionExpired?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  buttonText?: string;
}

export function ScanWithPhoneButton({
  onScanResult,
  onSessionExpired,
  onError,
  className,
  buttonText = 'Scan with phone',
}: ScanWithPhoneButtonProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [qrBase64, setQrBase64] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createScanSession, { loading }] = useMutation(CREATE_SCAN_SESSION);

  const handleScanResult = useCallback(
    (result: { scannedValue: string }) => {
      onScanResult?.(result.scannedValue);
      setIsModalOpen(false);
      setSessionId(null);
      setQrBase64(null);
    },
    [onScanResult]
  );

  const handleSessionExpired = useCallback(() => {
    onSessionExpired?.();
    setIsModalOpen(false);
    setSessionId(null);
    setQrBase64(null);
  }, [onSessionExpired]);

  const { isConnected, error } = useScanSession(sessionId, {
    onScanResult: handleScanResult,
    onSessionExpired: handleSessionExpired,
    onError,
  });

  const handleClick = async () => {
    try {
      const { data } = await createScanSession();
      if (data?.createScanSession) {
        setSessionId(data.createScanSession.sessionId);
        setQrBase64(data.createScanSession.qrBase64);
        setIsModalOpen(true);
      }
    } catch (err) {
      const mutationError = err instanceof Error ? err : new Error('Failed to create scan session');
      onError?.(mutationError);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSessionId(null);
    setQrBase64(null);
  };

  return (
    <>
      <Button onClick={handleClick} disabled={loading} className={className}>
        {loading ? 'Loading...' : buttonText}
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold dark:text-white">Scan with your phone</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="text-center">
              {qrBase64 && (
                <div className="mb-4">
                  <img
                    src={qrBase64}
                    alt="Scan this QR code with your phone"
                    className="mx-auto w-64 h-64"
                  />
                </div>
              )}

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Scan this QR code with the mobile app to continue
              </p>

              <div className="flex items-center justify-center gap-2 text-sm">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isConnected ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                />
                <span className="text-gray-500 dark:text-gray-400">
                  {isConnected ? 'Connected - Waiting for scan...' : 'Connecting...'}
                </span>
              </div>

              {error && (
                <p className="text-sm text-red-500 mt-2">Connection error: {error.message}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
