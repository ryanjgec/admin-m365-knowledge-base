
import { ReactNode } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Lock, Loader2, RefreshCw, Settings, User } from 'lucide-react';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const { isAdminAuthenticated, isCheckingAdmin, adminError, recheckAdmin } = useAdminAuth();

  console.log('AdminRoute Debug Info:', {
    user: user?.email,
    userId: user?.id,
    isAdminAuthenticated,
    isCheckingAdmin,
    adminError,
    authLoading
  });

  if (authLoading || isCheckingAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-gray-600 mb-2">Verifying admin access...</p>
            <p className="text-sm text-gray-500">
              Checking credentials for: {user?.email || 'Unknown user'}
            </p>
            {user?.id && (
              <p className="text-xs text-gray-400 mt-1">
                User ID: {user.id.slice(0, 8)}...
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl">Authentication Required</CardTitle>
            <CardDescription>
              You must be signed in to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => window.location.href = '/auth'}
              className="w-full"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (adminError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl">Admin Access Issue</CardTitle>
            <CardDescription className="text-left">
              <div className="space-y-2">
                <p><strong>Error:</strong> {adminError}</p>
                <div className="bg-gray-50 p-3 rounded text-xs">
                  <p><strong>User:</strong> {user.email}</p>
                  <p><strong>ID:</strong> {user.id}</p>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              onClick={recheckAdmin}
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry Admin Check
            </Button>
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full"
              variant="outline"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl">Admin Access Required</CardTitle>
            <CardDescription>
              <div className="space-y-2 text-left">
                <p>You need administrator privileges to access this area.</p>
                <div className="bg-gray-50 p-3 rounded text-xs">
                  <p><strong>Current User:</strong> {user.email}</p>
                  <p><strong>Required Role:</strong> admin</p>
                  <p><strong>Current Status:</strong> Regular user</p>
                </div>
                <p className="text-xs text-gray-500">
                  Contact your system administrator to request admin access.
                </p>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              onClick={recheckAdmin}
              className="w-full"
              variant="outline"
            >
              <Settings className="w-4 h-4 mr-2" />
              Check Admin Status
            </Button>
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
