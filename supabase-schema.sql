-- =============================================
-- CodeType Database Schema for Supabase
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS PROFILES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT UNIQUE,
  display_name TEXT,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  total_sessions INTEGER DEFAULT 0,
  total_time INTEGER DEFAULT 0,
  avg_wpm NUMERIC DEFAULT 0,
  avg_accuracy NUMERIC DEFAULT 0,
  best_wpm NUMERIC DEFAULT 0,
  best_accuracy NUMERIC DEFAULT 0,
  favorite_language TEXT,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TEST HISTORY TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.test_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  wpm NUMERIC NOT NULL,
  accuracy NUMERIC NOT NULL,
  time_elapsed INTEGER NOT NULL,
  correct_chars INTEGER NOT NULL,
  incorrect_chars INTEGER NOT NULL,
  total_chars INTEGER NOT NULL,
  language TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  mode TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  char_stats JSONB,
  snippet_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ACHIEVEMENTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,
  achievement_name TEXT NOT NULL,
  achievement_description TEXT,
  points INTEGER DEFAULT 0,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- =============================================
-- USER STATS TABLE (for detailed statistics)
-- =============================================
CREATE TABLE IF NOT EXISTS public.user_stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  total_races INTEGER DEFAULT 0,
  total_words INTEGER DEFAULT 0,
  total_time INTEGER DEFAULT 0,
  perfect_races INTEGER DEFAULT 0,
  last_race_date DATE,
  languages_practiced TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INDEXES for better query performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_test_history_user_id ON public.test_history(user_id);
CREATE INDEX IF NOT EXISTS idx_test_history_timestamp ON public.test_history(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON public.achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON public.user_stats(user_id);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view their own profile" 
  ON public.user_profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.user_profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.user_profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Test History Policies
CREATE POLICY "Users can view their own test history" 
  ON public.test_history FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own test history" 
  ON public.test_history FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own test history" 
  ON public.test_history FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own test history" 
  ON public.test_history FOR DELETE 
  USING (auth.uid() = user_id);

-- Achievements Policies
CREATE POLICY "Users can view their own achievements" 
  ON public.achievements FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" 
  ON public.achievements FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- User Stats Policies
CREATE POLICY "Users can view their own stats" 
  ON public.user_stats FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats" 
  ON public.user_stats FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stats" 
  ON public.user_stats FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for user_profiles
CREATE TRIGGER update_user_profiles_updated_at 
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for user_stats
CREATE TRIGGER update_user_stats_updated_at 
  BEFORE UPDATE ON public.user_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, username, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', SPLIT_PART(NEW.email, '@', 1))
  );
  
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- LEADERBOARD VIEW (Optional)
-- =============================================
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT 
  up.id,
  up.username,
  up.display_name,
  up.xp,
  up.level,
  up.best_wpm,
  up.best_accuracy,
  up.total_sessions,
  up.current_streak
FROM public.user_profiles up
ORDER BY up.xp DESC, up.best_wpm DESC
LIMIT 100;

-- Grant access to leaderboard view
GRANT SELECT ON public.leaderboard TO authenticated;
GRANT SELECT ON public.leaderboard TO anon;
