
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const AdminSetup = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

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
      console.log('Making user admin:', userEmail);

      // Since we can't use admin API, we'll work with the user_roles table directly
      // First check if this email exists in our profiles table
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', userEmail);

      if (profileError) {
        throw new Error(`Failed to find user profile: ${profileError.message}`);
      }

      if (!profiles || profiles.length === 0) {
        toast({
          title: "Error",
          description: `No user found with email: ${userEmail}. The user must sign up first.`,
          variant: "destructive",
        });
        return;
      }

      const targetUserId = profiles[0].id;
      console.log('Found user profile:', profiles[0]);

      // Check if user already has a role
      const { data: existingRole, error: roleCheckError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', targetUserId)
        .single();

      if (roleCheckError && roleCheckError.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw new Error(`Failed to check existing role: ${roleCheckError.message}`);
      }

      if (existingRole) {
        // Update existing role
        const { error: updateError } = await supabase
          .from('user_roles')
          .update({ role: 'admin' })
          .eq('user_id', targetUserId);

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
          .insert({ user_id: targetUserId, role: 'admin' });

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

  const makeSelfAdmin = async () => {
    if (!user?.email) {
      toast({
        title: "Error",
        description: "You must be logged in to make yourself admin",
        variant: "destructive",
      });
      return;
    }

    await makeUserAdmin(user.email);
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
          {user && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 mb-2">
                <strong>Current user:</strong> {user.email}
              </p>
              <Button 
                onClick={makeSelfAdmin}
                disabled={isLoading}
                className="w-full"
                variant="outline"
              >
                {isLoading ? 'Processing...' : 'Make Myself Admin'}
              </Button>
            </div>
          )}

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
            {isLoading ? 'Processing...' : 'Make User Admin'}
          </Button>

          <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
            <p><strong>Note:</strong> Users must sign up first before they can be made admin. This tool works with the profiles table instead of requiring admin API access.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;
