
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Eye, Heart, MessageCircle, TrendingUp } from 'lucide-react';

const AnalyticsDashboard = () => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      // Get total article views
      const { data: viewsData, error: viewsError } = await supabase
        .from('article_views')
        .select('*');
      
      if (viewsError) throw viewsError;

      // Get total likes
      const { data: likesData, error: likesError } = await supabase
        .from('article_likes')
        .select('*');
      
      if (likesError) throw likesError;

      // Get total comments
      const { data: commentsData, error: commentsError } = await supabase
        .from('article_comments')
        .select('*');
      
      if (commentsError) throw commentsError;

      // Get articles with analytics
      const { data: articlesData, error: articlesError } = await supabase
        .from('articles')
        .select('id, title, view_count, like_count, comment_count, created_at')
        .order('view_count', { ascending: false })
        .limit(5);
      
      if (articlesError) throw articlesError;

      return {
        totalViews: viewsData.length,
        totalLikes: likesData.length,
        totalComments: commentsData.length,
        pendingComments: commentsData.filter(c => c.status === 'pending').length,
        topArticles: articlesData,
        recentViews: viewsData.filter(v => 
          new Date(v.viewed_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        ).length
      };
    },
  });

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalViews || 0}</div>
            <p className="text-xs text-muted-foreground">
              {analytics?.recentViews || 0} in last 7 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalLikes || 0}</div>
            <p className="text-xs text-muted-foreground">
              Article engagement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalComments || 0}</div>
            <p className="text-xs text-muted-foreground">
              {analytics?.pendingComments || 0} pending approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics?.totalViews ? 
                Math.round((analytics.totalLikes / analytics.totalViews) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Likes per view
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Top Performing Articles
          </CardTitle>
          <CardDescription>
            Articles with the highest view counts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics?.topArticles?.map((article, index) => (
              <div key={article.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm">{article.title}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(article.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {article.view_count || 0}
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-3 h-3 mr-1" />
                    {article.like_count || 0}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    {article.comment_count || 0}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
