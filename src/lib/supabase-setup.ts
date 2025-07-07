import { supabase } from '@/integrations/supabase/client';

export const setupDatabase = async () => {
  try {
    // Test database connection
    const { data, error } = await supabase.from('categories').select('count');
    
    if (error) {
      console.error('Database connection error:', error);
      return false;
    }
    
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    return false;
  }
};

export const seedSampleData = async () => {
  try {
    // Check if categories already exist
    const { data: existingCategories } = await supabase
      .from('categories')
      .select('id')
      .limit(1);

    if (existingCategories && existingCategories.length > 0) {
      console.log('✅ Sample data already exists');
      return true;
    }

    console.log('🌱 Seeding sample data...');
    
    // The data will be seeded via the migration files
    // This function is for verification
    
    return true;
  } catch (error) {
    console.error('❌ Failed to seed sample data:', error);
    return false;
  }
};

export const createFirstAdmin = async (userEmail: string) => {
  try {
    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', userEmail)
      .single();

    if (profileError || !profile) {
      throw new Error('User profile not found. Please sign up first.');
    }

    // Check if user is already admin
    const { data: existingRole } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', profile.id)
      .eq('role', 'admin')
      .single();

    if (existingRole) {
      console.log('✅ User is already an admin');
      return true;
    }

    // Make user admin
    const { error: roleError } = await supabase
      .from('user_roles')
      .upsert({
        user_id: profile.id,
        role: 'admin'
      });

    if (roleError) {
      throw roleError;
    }

    console.log('✅ Admin role assigned successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to create admin:', error);
    return false;
  }
};