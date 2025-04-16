-- Create a function to create the profiles table if it doesn't exist
CREATE OR REPLACE FUNCTION create_profiles_table()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table exists
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles'
  ) THEN
    -- Create the profiles table
    CREATE TABLE public.profiles (
      id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL DEFAULT 'student',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Set up Row Level Security (RLS)
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Users can view their own profile"
      ON public.profiles
      FOR SELECT
      USING (auth.uid() = id);

    CREATE POLICY "Users can update their own profile"
      ON public.profiles
      FOR UPDATE
      USING (auth.uid() = id);

    CREATE POLICY "Admin users can view all profiles"
      ON public.profiles
      FOR SELECT
      USING (
        EXISTS (
          SELECT 1 FROM auth.users
          WHERE auth.users.id = auth.uid()
          AND auth.users.role = 'admin'
        )
      );

    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$;
