-- Update the current user's role to admin
UPDATE public.profiles 
SET role = 'admin' 
WHERE user_id = 'cfd264bf-36fd-4eee-a1d5-344079636a6b';