
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const AdminSetup = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUsers, setCurrentUsers] = useState<any[]>([]);
  const [showUsers, setShowUsers] = useState(false);
  const { toast } = useToast();

  const checkCurrentUsers = async () => {
    setIsLoading(true);
    try {
      // Get all users
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('Error fetching auth users:', authError);
        toast({
          title: "Error",
          description: "Failed to fetch users: " + authError.message,
          variant: "destructive",
        });
        return;
      }

      // Get user roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
      }

      console.log('Auth users:', authUsers);
      console.log('User roles:', roles);

      const usersWithRoles = authUsers.users.map(user => {
        const userRole = roles?.find(role => role.user_id === user.id);
        return {
          ...user,
          role: userRole?.role || 'none'
        };
      });

      setCurrentUsers(usersWithRoles);
      setShowUsers(true);
      
      toast({
        title: "Users fetched",
        description: `Found ${usersWithRoles.length} users`,
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "Unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const makeUserAdmin = async (userEmail: string) => {
    if (!userEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // First, find the user by email
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        throw new Error(`Failed to fetch users: ${authError.message}`);
      }

      const targetUser = authUsers.users.find(user => user.email === userEmail);
      
      if (!targetUser) {
        toast({
          title: "Error",
          description: `No user found with email: ${userEmail}`,
          variant: "destructive",
        });
        return;
      }

      console.log('Found user:', targetUser);

      // Check if user already has a role
      const { data: existingRole, error: roleCheckError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', targetUser.id)
        .single();

      if (roleCheckError && roleCheckError.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw new Error(`Failed to check existing role: ${roleCheckError.message}`);
      }

      if (existingRole) {
        // Update existing role
        const { error: updateError } = await supabase
          .from('user_roles')
          .update({ role: 'admin' })
          .eq('user_id', targetUser.id);

        if (updateError) {
          throw new Error(`Failed to update role: ${updateError.message}`);
        }

        toast({
          title: "Success!",
          description: `${userEmail} role updated to admin`,
        });
      } else {
        // Insert new role
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert({ user_id: targetUser.id, role: 'admin' });

        if (insertError) {
          throw new Error(`Failed to create admin role: ${insertError.message}`);
        }

        toast({
          title: "Success!",
          description: `${userEmail} is now an admin`,
        });
      }

      setEmail('');
      
    } catch (error) {
      console.error('Error making user admin:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to make user admin",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Setup</CardTitle>
          <CardDescription>
            Make a user an administrator to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              User Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter user email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={() => makeUserAdmin(email)}
            disabled={isLoading || !email.trim()}
            className="w-full"
          >
            {isLoading ? 'Processing...' : 'Make Admin'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Debug Tools</CardTitle>
          <CardDescription>
            View current users and their roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={checkCurrentUsers}
            disabled={isLoading}
            variant="outline"
            className="w-full"
          >
            {isLoading ? 'Loading...' : 'Show All Users & Roles'}
          </Button>
          
          {showUsers && (
            <div className="mt-4 space-y-2">
              <h4 className="font-medium">Current Users:</h4>
              {currentUsers.map((user, index) => (
                <div key={user.id} className="p-2 bg-gray-50 rounded text-sm">
                  <div><strong>Email:</strong> {user.email}</div>
                  <div><strong>Role:</strong> {user.role}</div>
                  <div><strong>ID:</strong> {user.id}</div>
                  {user.role !== 'admin' && (
                    <Button
                      size="sm"
                      className="mt-2"
                      onClick={() => makeUserAdmin(user.email)}
                      disabled={isLoading}
                    >
                      Make Admin
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;
