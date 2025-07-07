import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Database, Users, FileText, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface DatabaseStats {
  categories: number;
  articles: number;
  users: number;
  subscribers: number;
}

const DatabaseStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const checkDatabaseStatus = async () => {
    try {
      setLoading(true);
      
      // Test connection and get stats
      const [categoriesResult, articlesResult, usersResult, subscribersResult] = await Promise.all([
        supabase.from('categories').select('id', { count: 'exact' }),
        supabase.from('articles').select('id', { count: 'exact' }),
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('newsletter_subscribers').select('id', { count: 'exact' })
      ]);

      if (categoriesResult.error) throw categoriesResult.error;

      setIsConnected(true);
      setStats({
        categories: categoriesResult.count || 0,
        articles: articlesResult.count || 0,
        users: usersResult.count || 0,
        subscribers: subscribersResult.count || 0
      });
    } catch (error) {
      console.error('Database status check failed:', error);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkDatabaseStatus();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Database Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Database Status
          </div>
          <Badge variant={isConnected ? "default" : "destructive"} className="flex items-center">
            {isConnected ? (
              <>
                <CheckCircle className="w-4 h-4 mr-1" />
                Connected
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 mr-1" />
                Disconnected
              </>
            )}
          </Badge>
        </CardTitle>
        <CardDescription>
          Real-time database connection and statistics
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected && stats ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <FileText className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{stats.categories}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <FileText className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{stats.articles}</div>
              <div className="text-sm text-gray-600">Articles</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">{stats.users}</div>
              <div className="text-sm text-gray-600">Users</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <Settings className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-orange-600">{stats.subscribers}</div>
              <div className="text-sm text-gray-600">Subscribers</div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <XCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <p className="text-gray-600 mb-4">Database connection failed</p>
            <Button onClick={checkDatabaseStatus} variant="outline">
              Retry Connection
            </Button>
          </div>
        )}
        
        {user && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Signed in as: {user.email}</span>
              <Button 
                onClick={checkDatabaseStatus} 
                variant="ghost" 
                size="sm"
              >
                Refresh
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DatabaseStatus;