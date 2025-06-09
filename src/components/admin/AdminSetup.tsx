
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Settings, Shield, User } from 'lucide-react';

const AdminSetup = () => {
  const [email, setEmail] = useState('admin@microsoftadmin.in');
  const [loading, setLoading] = useState(false);

  const makeUserAdmin = async () => {
    if (!email) {
      toast({ title: 'Please enter an email address', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      // First, get the user ID from profiles table
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email.toLowerCase())
        .single();

      if (profileError || !profiles) {
        toast({ 
          title: 'User not found', 
          description: `No user found with email: ${email}`,
          variant: 'destructive' 
        });
        return;
      }

      const userId = profiles.id;

      // Check if user already has a role
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (existingRole) {
        // Update existing role
        const { error: updateError } = await supabase
          .from('user_roles')
          .update({ role: 'admin' })
          .eq('user_id', userId);

        if (updateError) {
          toast({ 
            title: 'Failed to update role', 
            description: updateError.message,
            variant: 'destructive' 
          });
          return;
        }
      } else {
        // Insert new role
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'admin' });

        if (insertError) {
          toast({ 
            title: 'Failed to create admin role', 
            description: insertError.message,
            variant: 'destructive' 
          });
          return;
        }
      }

      toast({ 
        title: 'Success!', 
        description: `${email} is now an admin user`,
      });

    } catch (error) {
      console.error('Error making user admin:', error);
      toast({ 
        title: 'Error', 
        description: 'An unexpected error occurred',
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Settings className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl">Admin Setup</CardTitle>
        <CardDescription>
          Make a user an administrator
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            User Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user email"
            className="w-full"
          />
        </div>
        <Button 
          onClick={makeUserAdmin}
          disabled={loading}
          className="w-full"
        >
          <Shield className="w-4 h-4 mr-2" />
          {loading ? 'Making Admin...' : 'Make Admin'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminSetup;
