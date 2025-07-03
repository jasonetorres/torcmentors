import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

export default function AdminUserCreation() {
  const [creating, setCreating] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const createMenteeAccounts = async () => {
    setCreating(true);
    setError(null);
    setResults(null);

    try {
      const { data, error } = await supabase.functions.invoke('create-mentee-accounts', {
        body: {}
      });

      if (error) {
        setError(error.message);
      } else {
        setResults(data);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setCreating(false);
    }
  };

  const createMentorAccounts = async () => {
    setCreating(true);
    setError(null);
    setResults(null);

    try {
      const { data, error } = await supabase.functions.invoke('create-mentor-accounts', {
        body: {}
      });

      if (error) {
        setError(error.message);
      } else {
        setResults(data);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin User Creation</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create Mentee Accounts</CardTitle>
            <CardDescription>
              Creates accounts for all mentees with default passwords
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={createMenteeAccounts}
              disabled={creating}
              className="w-full"
            >
              {creating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Mentee Accounts'
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Create Mentor Accounts</CardTitle>
            <CardDescription>
              Creates accounts for all mentors with default passwords
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={createMentorAccounts}
              disabled={creating}
              className="w-full"
            >
              {creating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Mentor Accounts'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(results, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}