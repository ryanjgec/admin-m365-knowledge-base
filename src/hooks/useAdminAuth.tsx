
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
    if (loading || !user) {
      setIsAdminAuthenticated(false);
      setIsCheckingAdmin(false);
      return;
    }
    
    console.log('AdminAuth: Starting admin check...', { user: user?.email, userId: user?.id });
    setIsCheckingAdmin(true);
    setAdminError(null);

    try {
      // First check if user_roles table has any records for this user
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      console.log('AdminAuth: User roles check:', { userRoles, rolesError });

      if (rolesError) {
        console.error('AdminAuth: Error checking user roles:', rolesError);
        setAdminError(`Database error: ${rolesError.message}`);
        setIsAdminAuthenticated(false);
        setIsCheckingAdmin(false);
        return;
      }

      // Check if user has admin role
      const hasAdminRole = userRoles?.some(role => role.role === 'admin');
      
      if (hasAdminRole) {
        setIsAdminAuthenticated(true);
        setAdminError(null);
      } else {
        setIsAdminAuthenticated(false);
        setAdminError('Access denied: User does not have admin privileges');
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
    if (!loading) {
      checkAdminStatus();
    }
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
