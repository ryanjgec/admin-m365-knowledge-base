
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, Mail } from 'lucide-react';

interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
  unsubscribed_at?: string;
}

const NewsletterManager = () => {
  const { data: subscribers, isLoading } = useQuery({
    queryKey: ['newsletter-subscribers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });
      
      if (error) throw error;
      return data as NewsletterSubscriber[];
    },
  });

  const exportSubscribers = () => {
    if (!subscribers) return;

    const activeSubscribers = subscribers.filter(sub => sub.is_active);
    const csvContent = [
      'Email,Subscribed Date,Status',
      ...activeSubscribers.map(sub => 
        `${sub.email},${new Date(sub.subscribed_at).toLocaleDateString()},Active`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return <div>Loading subscribers...</div>;
  }

  const activeCount = subscribers?.filter(sub => sub.is_active).length || 0;
  const totalCount = subscribers?.length || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Newsletter Subscribers
          </div>
          <Button onClick={exportSubscribers} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </CardTitle>
        <CardDescription>
          {activeCount} active subscribers out of {totalCount} total
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Subscribed</TableHead>
              <TableHead>Unsubscribed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers?.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell className="font-medium">{subscriber.email}</TableCell>
                <TableCell>
                  <Badge variant={subscriber.is_active ? 'default' : 'secondary'}>
                    {subscriber.is_active ? 'Active' : 'Unsubscribed'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(subscriber.subscribed_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {subscriber.unsubscribed_at 
                    ? new Date(subscriber.unsubscribed_at).toLocaleDateString()
                    : '-'
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default NewsletterManager;
