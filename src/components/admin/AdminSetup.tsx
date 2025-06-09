
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

      // First check if this email exists in our profiles table
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', userEmail.toLowerCase().trim())
        .single();

      console.log('Profile search result:', { profiles, profileError });

      if (profileError || !profiles) {
        console.error('Profile error:', profileError);
        toast({
          title: "User Not Found",
          description: `No user found with email: ${userEmail}. The user must sign up first.`,
          variant: "destructive",
        });
        return;
      }

      const targetUserId = profiles.id;
      console.log('Found user profile:', profiles);

      // Use the RPC function to update the role
      const { data, error: rpcError } = await supabase.rpc('update_user_role', {
        target_user_id: targetUserId,
        new_role: 'admin'
      });

      if (rpcError) {
        console.error('RPC error:', rpcError);
        throw new Error(`Failed to update role: ${rpcError.message}`);
      }

      console.log('Role updated successfully via RPC');
      toast({
        title: "Success!",
        description: `${userEmail} is now an admin`,
      });

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
              disabled={isLoading}
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
            <p><strong>Note:</strong> Users must sign up first before they can be made admin. This tool uses the secure database functions.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;
