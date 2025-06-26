/*
  # DecodeDesk Initial Schema

  1. New Tables
    - `translations`
      - `id` (uuid, primary key)
      - `original_text` (text, the corporate speak input)
      - `translated_text` (text, the plain English output)
      - `session_id` (text, anonymous user session)
      - `created_at` (timestamp)
      - `is_example_used` (boolean, whether this came from clicking an example)
      - `example_phrase` (text, which example was used if applicable)

    - `example_phrases`
      - `id` (uuid, primary key) 
      - `phrase` (text, the corporate speak example)
      - `usage_count` (integer, how many times it's been used)
      - `created_at` (timestamp)

    - `daily_stats`
      - `id` (uuid, primary key)
      - `date` (date, the day)
      - `total_translations` (integer, count for that day)
      - `unique_sessions` (integer, unique users that day)

  2. Security
    - Enable RLS on all tables
    - Add policies for anonymous access to insert and read data
*/

-- Translations table
CREATE TABLE IF NOT EXISTS translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  original_text text NOT NULL,
  translated_text text NOT NULL,
  session_id text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  is_example_used boolean DEFAULT false,
  example_phrase text DEFAULT ''
);

ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert and read translations
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

-- Example phrases table
CREATE TABLE IF NOT EXISTS example_phrases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phrase text NOT NULL UNIQUE,
  usage_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE example_phrases ENABLE ROW LEVEL SECURITY;

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

-- Daily stats table
CREATE TABLE IF NOT EXISTS daily_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  total_translations integer DEFAULT 0,
  unique_sessions integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;

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

-- Insert initial example phrases
INSERT INTO example_phrases (phrase) VALUES 
  ('Let''s circle back on this and touch base offline'),
  ('We need to leverage our synergies to move the needle'),  
  ('I''m going to ping you to ideate some solutions'),
  ('Let''s take this conversation offline and drill down'),
  ('We should circle back and align on our bandwidth')
ON CONFLICT (phrase) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_translations_created_at ON translations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_translations_session_id ON translations(session_id);
CREATE INDEX IF NOT EXISTS idx_example_phrases_usage_count ON example_phrases(usage_count DESC);
CREATE INDEX IF NOT EXISTS idx_daily_stats_date ON daily_stats(date DESC);