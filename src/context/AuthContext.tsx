import React, { createContext, useContext, useState } from 'react';
import { IAMService } from '../services/IAMService';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  error: string | null;
  qrCodeData: string | null;
  loading: boolean;
  startAuthentication: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const iamService = new IAMService();
const APP_ID = '6c9bfb77-6623-4bcf-a09d-cb3d87ca4fb0';
const HUB_ID = '6bf8216f-a8ff-46ef-a43f-b9c1ab831505';
const PRIVATE_KEY = 'MCwCAQAwBQYDK2VwBCAz02oBjCecmICMFWnP016FmEYlh1I2UN3iCDuLPtusGw==';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verificationInterval, setVerificationInterval] = useState<number | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const clearVerificationInterval = () => {
    if (verificationInterval) {
      window.clearInterval(verificationInterval);
      setVerificationInterval(null);
    }
  };

  React.useEffect(() => {
    return () => clearVerificationInterval();
  }, []);

  const startAuthentication = async () => {
    try {
      setLoading(true);
      setError(null);

      const qrResponse = await iamService.generateAuthQRCode({
        appId: APP_ID,
        hubId: HUB_ID,
        signingPrivateKey: PRIVATE_KEY,
      });

      setQrCodeData(qrResponse.qrCodeBase64);
      setTransactionId(qrResponse.transactionId);

      // Start polling for verification
      const intervalId = window.setInterval(async () => {
        try {
          const verificationResponse = await iamService.checkVerification({
            applicationId: APP_ID,
            transactionId: qrResponse.transactionId,
            timeoutInMs: 5000,
          });

          if (verificationResponse.verified && 
              verificationResponse.encryptedSessionToken && 
              verificationResponse.encryptionIv) {
            clearVerificationInterval();

            const sessionResponse = await iamService.verifySession({
              encryptedSessionToken: verificationResponse.encryptedSessionToken,
              encryptionIv: verificationResponse.encryptionIv,
              applicationId: APP_ID,
            });

            setUserEmail(sessionResponse.email);
            setIsAuthenticated(true);
            setLoading(false);
          }
        } catch (error) {
          console.error('Verification check failed:', error);
          setError('Verification failed');
          setLoading(false);
        }
      }, 2000);

      setVerificationInterval(intervalId);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Authentication failed');
      console.error('Authentication error:', error);
      setLoading(false);
    }
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    setQrCodeData(null);
    setError(null);
    setTransactionId(null);
    clearVerificationInterval();
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      userEmail,
      error,
      qrCodeData,
      loading,
      startAuthentication,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};