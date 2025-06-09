
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const DatabaseInit = () => {
  useEffect(() => {
    const initializeAdminUser = async () => {
      try {
        // Check if admin user exists in profiles
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', 'admin@microsoftadmin.in')
          .single();

        if (!existingProfile) {
          console.log('Creating admin user profile...');
          
          // Create a fixed UUID for the admin user
          const adminUserId = '00000000-0000-0000-0000-000000000001';
          
          // Insert admin profile
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: adminUserId,
              email: 'admin@microsoftadmin.in',
              full_name: 'Administrator'
            });

          if (profileError) {
            console.error('Error creating admin profile:', profileError);
          }

          // Insert admin role
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert({
              user_id: adminUserId,
              role: 'admin'
            });

          if (roleError) {
            console.error('Error creating admin role:', roleError);
          } else {
            console.log('Admin user created successfully');
          }
        }
      } catch (error) {
        console.error('Error initializing admin user:', error);
      }
    };

    initializeAdminUser();
  }, []);

  return null;
};

export default DatabaseInit;
