-- Add avatar_url to the profiles table
ALTER TABLE profiles 
  ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Notify postgrest to reload the schema cache so the API recognizes the new column immediately
NOTIFY pgrst, 'reload schema';
