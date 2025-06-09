
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
      // First, let's check if user_roles table exists and has data
      console.log('AdminAuth: Checking user_roles table...');
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      console.log('AdminAuth: Direct role check result:', { rolesData, rolesError });

      if (rolesError) {
        console.error('AdminAuth: Error checking user_roles:', rolesError);
        setAdminError(`Database error: ${rolesError.message}`);
        setIsAdminAuthenticated(false);
      } else if (rolesData && rolesData.length > 0) {
        const isAdmin = rolesData.some(role => role.role === 'admin');
        console.log('AdminAuth: User role check result:', { roles: rolesData, isAdmin });
        setIsAdminAuthenticated(isAdmin);
        if (!isAdmin) {
          setAdminError(`Access denied: User has role '${rolesData[0].role}' but needs 'admin' role`);
        }
      } else {
        console.log('AdminAuth: No roles found for user, creating default user role...');
        // User has no role, let's create one
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert({ user_id: user.id, role: 'user' });
        
        if (insertError) {
          console.error('AdminAuth: Error creating user role:', insertError);
          setAdminError(`Failed to create user role: ${insertError.message}`);
        } else {
          setAdminError('User role created as regular user. Contact admin to upgrade to admin role.');
        }
        setIsAdminAuthenticated(false);
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
