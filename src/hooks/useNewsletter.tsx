
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const useNewsletter = () => {
  const [email, setEmail] = useState('');
  const queryClient = useQueryClient();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({ 
        title: 'Successfully subscribed!', 
        description: 'Thank you for subscribing to our newsletter.' 
      });
      setEmail('');
      queryClient.invalidateQueries({ queryKey: ['newsletter-subscribers'] });
    },
    onError: (error: any) => {
      console.error('Newsletter subscription error:', error);
      if (error.code === '23505') {
        toast({ 
          title: 'Already subscribed', 
          description: 'This email is already subscribed to our newsletter.',
          variant: 'destructive'
        });
      } else {
        toast({ 
          title: 'Subscription failed', 
          description: 'Please try again later.',
          variant: 'destructive'
        });
      }
    },
  });

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({ title: 'Email is required', variant: 'destructive' });
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({ title: 'Please enter a valid email address', variant: 'destructive' });
      return;
    }
    
    subscribeMutation.mutate(email.trim().toLowerCase());
  };

  return {
    email,
    setEmail,
    subscribe,
    isLoading: subscribeMutation.isPending,
  };
};
