-- Create a groups table to store actual group data
CREATE TABLE public.groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  phase TEXT DEFAULT 'phase1',
  status TEXT DEFAULT 'forming' CHECK (status IN ('active', 'forming', 'completed')),
  mentor_id UUID REFERENCES public.profiles(user_id),
  max_size INTEGER DEFAULT 4,
  schedule TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;

-- Create policies for groups
CREATE POLICY "Groups are viewable by everyone" 
ON public.groups 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage groups" 
ON public.groups 
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Add trigger for updated_at
CREATE TRIGGER update_groups_updated_at
BEFORE UPDATE ON public.groups
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();