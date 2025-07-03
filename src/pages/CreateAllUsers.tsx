import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

export default function CreateAllUsers() {
  const [creating, setCreating] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const createAllUsers = async () => {
    setCreating(true);
    setError(null);
    setResults(null);

    try {
      console.log('Creating mentee accounts...');
      const { data: menteeData, error: menteeError } = await supabase.functions.invoke('create-mentee-accounts', {
        body: {}
      });

      if (menteeError) {
        console.error('Mentee creation error:', menteeError);
        setError(`Mentee creation failed: ${menteeError.message}`);
        setCreating(false);
        return;
      }

      console.log('Creating mentor accounts...');
      const { data: mentorData, error: mentorError } = await supabase.functions.invoke('create-mentor-accounts', {
        body: {}
      });

      if (mentorError) {
        console.error('Mentor creation error:', mentorError);
        setError(`Mentor creation failed: ${mentorError.message}`);
        setCreating(false);
        return;
      }

      setResults({
        mentees: menteeData,
        mentors: mentorData,
        total: (menteeData?.results?.filter((r: any) => r.success)?.length || 0) + 
               (mentorData?.results?.filter((r: any) => r.success)?.length || 0)
      });

    } catch (err: any) {
      console.error('Creation error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setCreating(false);
    }
  };

  // Auto-create on mount
  useState(() => {
    createAllUsers();
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Creating All Users</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>User Creation Progress</CardTitle>
          <CardDescription>
            Creating all mentee and mentor accounts...
          </CardDescription>
        </CardHeader>
        <CardContent>
          {creating && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Creating users...</span>
            </div>
          )}
          
          {!creating && (
            <Button onClick={createAllUsers} className="w-full">
              Create All Users Again
            </Button>
          )}
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Creation Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-lg font-semibold">Total Users Created: {results.total}</p>
              
              <div>
                <h3 className="font-semibold mb-2">Mentees:</h3>
                <pre className="text-sm bg-muted p-3 rounded overflow-auto max-h-40">
                  {JSON.stringify(results.mentees, null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Mentors:</h3>
                <pre className="text-sm bg-muted p-3 rounded overflow-auto max-h-40">
                  {JSON.stringify(results.mentors, null, 2)}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}