
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  isCheckingAdmin: boolean;
  adminError: string | null;
  recheckAdmin: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const [adminError, setAdminError] = useState<string | null>(null);
  const { user, loading } = useAuth();

  const checkAdminStatus = async () => {
    if (loading) return;
    
    console.log('AdminAuth: Starting admin check...', { user: user?.email, userId: user?.id });
    setIsCheckingAdmin(true);
    setAdminError(null);

    if (!user) {
      console.log('AdminAuth: No user found');
      setIsAdminAuthenticated(false);
      setIsCheckingAdmin(false);
      return;
    }

    try {
      // Use the is_admin RPC function for a cleaner check
      const { data: isAdmin, error: adminError } = await supabase
        .rpc('is_admin', { user_id: user.id });

      console.log('AdminAuth: Admin check result:', { isAdmin, adminError });

      if (adminError) {
        console.error('AdminAuth: Error checking admin status:', adminError);
        setAdminError(`Database error: ${adminError.message}`);
        setIsAdminAuthenticated(false);
      } else {
        setIsAdminAuthenticated(Boolean(isAdmin));
        if (!isAdmin) {
          setAdminError('Access denied: User does not have admin privileges');
        }
      }
    } catch (error) {
      console.error('AdminAuth: Unexpected error:', error);
      setAdminError(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsAdminAuthenticated(false);
    } finally {
      setIsCheckingAdmin(false);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, [user, loading]);

  const recheckAdmin = () => {
    checkAdminStatus();
  };

  return (
    <AdminAuthContext.Provider value={{ 
      isAdminAuthenticated, 
      isCheckingAdmin,
      adminError,
      recheckAdmin
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
