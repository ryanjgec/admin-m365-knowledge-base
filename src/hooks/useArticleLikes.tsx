
import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export const useArticleLikes = (articleId: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [userHasLiked, setUserHasLiked] = useState(false);

  // Check if user has liked this article
  const { data: userLike } = useQuery({
    queryKey: ['article-like', articleId, user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('article_likes')
        .select('*')
        .eq('article_id', articleId)
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user && !!articleId,
  });

  useEffect(() => {
    setUserHasLiked(!!userLike);
  }, [userLike]);

  const toggleLikeMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        toast({ title: 'Please sign in to like articles', variant: 'destructive' });
        return;
      }

      if (userHasLiked) {
        // Unlike
        const { error } = await supabase
          .from('article_likes')
          .delete()
          .eq('article_id', articleId)
          .eq('user_id', user.id);
        
        if (error) throw error;
      } else {
        // Like
        const { error } = await supabase
          .from('article_likes')
          .insert([{ article_id: articleId, user_id: user.id }]);
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      setUserHasLiked(!userHasLiked);
      queryClient.invalidateQueries({ queryKey: ['article-like', articleId, user?.id] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
    onError: (error: any) => {
      console.error('Error toggling like:', error);
      toast({ title: 'Error updating like', variant: 'destructive' });
    },
  });

  return {
    userHasLiked,
    toggleLike: toggleLikeMutation.mutate,
    isLoading: toggleLikeMutation.isPending,
  };
};
