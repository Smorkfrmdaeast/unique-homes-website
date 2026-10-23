import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AdminUser {
  email: string;
  name: string;
  photoUrl?: string;
  isMaster: boolean;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  currentUser: AdminUser | null;
  masterEmail: string | null;
  hasPinSet: boolean;
  signInWithGoogle: (email: string, name: string, photoUrl?: string) => Promise<{ success: boolean; isFirstLogin: boolean; message: string }>;
  setAdminPin: (pin: string) => void;
  verifyPin: (pin: string) => boolean;
  logout: () => void;
}

const MASTER_EMAIL_KEY = 'unique_homes_master_admin_email';
const ADMIN_PIN_KEY = 'unique_homes_admin_pin';
const SESSION_AUTH_KEY = 'unique_homes_admin_session';

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [masterEmail, setMasterEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem(MASTER_EMAIL_KEY);
    } catch {
      return null;
    }
  });

  const [hasPinSet, setHasPinSet] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem(ADMIN_PIN_KEY);
    } catch {
      return false;
    }
  });

  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_AUTH_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!currentUser;

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem(SESSION_AUTH_KEY, JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem(SESSION_AUTH_KEY);
    }
  }, [currentUser]);

  const signInWithGoogle = async (
    email: string,
    name: string,
    photoUrl?: string
  ): Promise<{ success: boolean; isFirstLogin: boolean; message: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    let currentMaster = masterEmail;
    let isFirstLogin = false;

    // First login claiming: Whoever signs in first claims Master Admin ownership!
    if (!currentMaster) {
      currentMaster = cleanEmail;
      setMasterEmail(cleanEmail);
      localStorage.setItem(MASTER_EMAIL_KEY, cleanEmail);
      isFirstLogin = true;
    }

    // Check if the signing-in user matches the registered Master Admin
    if (cleanEmail !== currentMaster) {
      return {
        success: false,
        isFirstLogin: false,
        message: `Unauthorized. Master access is locked to ${currentMaster}. Please sign in with the Master Admin account.`,
      };
    }

    const adminData: AdminUser = {
      email: cleanEmail,
      name: name.trim() || 'Unique Homes Owner',
      photoUrl: photoUrl || '',
      isMaster: true,
    };

    setCurrentUser(adminData);

    return {
      success: true,
      isFirstLogin,
      message: isFirstLogin
        ? `Welcome! Your Google account (${cleanEmail}) has been registered as the permanent Master Admin.`
        : `Welcome back, ${adminData.name}!`,
    };
  };

  const setAdminPin = (pin: string) => {
    const cleanPin = pin.trim();
    if (cleanPin.length >= 4) {
      localStorage.setItem(ADMIN_PIN_KEY, cleanPin);
      setHasPinSet(true);
    }
  };

  const verifyPin = (pin: string): boolean => {
    try {
      const stored = localStorage.getItem(ADMIN_PIN_KEY);
      if (!stored) return true; // If no PIN is configured yet
      return stored === pin.trim();
    } catch {
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem(SESSION_AUTH_KEY);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        masterEmail,
        hasPinSet,
        signInWithGoogle,
        setAdminPin,
        verifyPin,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
