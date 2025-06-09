
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useArticleViews = (articleId: string) => {
  const trackViewMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('article_views')
        .insert([{ 
          article_id: articleId,
          ip_address: 'unknown',
          user_agent: navigator.userAgent
        }]);
      
      if (error) throw error;
    },
    onError: (error) => {
      console.error('Error tracking article view:', error);
    },
  });

  useEffect(() => {
    if (articleId) {
      // Track view after a 3-second delay to ensure meaningful engagement
      const timer = setTimeout(() => {
        trackViewMutation.mutate();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [articleId]);

  return { trackView: trackViewMutation.mutate };
};
