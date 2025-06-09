
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  isCheckingAdmin: boolean;
  adminError: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const [adminError, setAdminError] = useState<string | null>(null);
  const { user, loading } = useAuth();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (loading) return;
      
      setIsCheckingAdmin(true);
      setAdminError(null);

      if (!user) {
        setIsAdminAuthenticated(false);
        setIsCheckingAdmin(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .rpc('is_admin', { user_id: user.id });

        if (error) {
          console.error('Error checking admin status:', error);
          setAdminError('Failed to verify admin status');
          setIsAdminAuthenticated(false);
        } else {
          setIsAdminAuthenticated(data || false);
        }
      } catch (error) {
        console.error('Error in admin check:', error);
        setAdminError('Authentication error');
        setIsAdminAuthenticated(false);
      } finally {
        setIsCheckingAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user, loading]);

  return (
    <AdminAuthContext.Provider value={{ 
      isAdminAuthenticated, 
      isCheckingAdmin,
      adminError
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
