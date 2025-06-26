/*
  # Complete DecodeDesk Database Schema

  1. New Tables
    - `translations` - Store user translations with session tracking
    - `example_phrases` - Pre-populated corporate speak examples with usage tracking
    - `daily_stats` - Analytics for daily usage statistics

  2. Security
    - Enable RLS on all tables
    - Add policies for anonymous users to use the app without signup
    - Allow read/write access for core functionality

  3. Performance
    - Add indexes for frequently queried columns
    - Optimize for translation lookups and analytics

  4. Data
    - Pre-populate example phrases for immediate user engagement
    - Create utility function for usage tracking
*/

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow anonymous insert translations" ON translations;
DROP POLICY IF EXISTS "Allow anonymous read translations" ON translations;
DROP POLICY IF EXISTS "Allow anonymous read example_phrases" ON example_phrases;
DROP POLICY IF EXISTS "Allow anonymous update example_phrases" ON example_phrases;
DROP POLICY IF EXISTS "Allow anonymous read daily_stats" ON daily_stats;
DROP POLICY IF EXISTS "Allow anonymous insert daily_stats" ON daily_stats;
DROP POLICY IF EXISTS "Allow anonymous update daily_stats" ON daily_stats;

-- Create translations table
CREATE TABLE IF NOT EXISTS translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  original_text text NOT NULL,
  translated_text text NOT NULL,
  session_id text DEFAULT ''::text,
  created_at timestamptz DEFAULT now(),
  is_example_used boolean DEFAULT false,
  example_phrase text DEFAULT ''::text
);

-- Create example_phrases table
CREATE TABLE IF NOT EXISTS example_phrases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phrase text UNIQUE NOT NULL,
  usage_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create daily_stats table
CREATE TABLE IF NOT EXISTS daily_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date UNIQUE NOT NULL,
  total_translations integer DEFAULT 0,
  unique_sessions integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE example_phrases ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for translations table
CREATE POLICY "Allow anonymous insert translations"
  ON translations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous read translations"
  ON translations
  FOR SELECT
  TO anon
  USING (true);

-- Create policies for example_phrases table
CREATE POLICY "Allow anonymous read example_phrases"
  ON example_phrases
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous update example_phrases"
  ON example_phrases
  FOR UPDATE
  TO anon
  USING (true);

-- Create policies for daily_stats table
CREATE POLICY "Allow anonymous read daily_stats"
  ON daily_stats
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous insert daily_stats"
  ON daily_stats
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update daily_stats"
  ON daily_stats
  FOR UPDATE
  TO anon
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_translations_created_at ON translations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_translations_session_id ON translations (session_id);
CREATE INDEX IF NOT EXISTS idx_example_phrases_usage_count ON example_phrases (usage_count DESC);
CREATE INDEX IF NOT EXISTS idx_daily_stats_date ON daily_stats (date DESC);

-- Insert initial example phrases (only if they don't exist)
INSERT INTO example_phrases (phrase) VALUES 
  ('Let''s circle back on this'),
  ('We need to leverage our synergies'),
  ('This is a paradigm shift'),
  ('Let''s touch base offline'),
  ('We should ideate some solutions'),
  ('Do you have bandwidth for this?'),
  ('Let''s move the needle'),
  ('We need to think outside the box'),
  ('This is low-hanging fruit'),
  ('Let''s drill down into the details'),
  ('We need to be more agile'),
  ('Let''s take this offline'),
  ('We need to optimize our workflow'),
  ('This will help us scale'),
  ('Let''s align on our strategy')
ON CONFLICT (phrase) DO NOTHING;

-- Create or replace function to increment usage count
CREATE OR REPLACE FUNCTION increment_usage(phrase_text text)
RETURNS void AS $$
BEGIN
  UPDATE example_phrases 
  SET usage_count = usage_count + 1 
  WHERE phrase = phrase_text;
END;
$$ LANGUAGE plpgsql;