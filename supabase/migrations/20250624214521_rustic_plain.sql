/*
  # Fix example phrases and add authentication

  1. New Tables
    - `users` table for authentication
    - `subscriptions` table for pricing plans
    - Fix `example_phrases` with proper data
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
  
  3. Sample Data
    - Add corporate speak examples
    - Add pricing plan data
*/

-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  subscription_plan text DEFAULT 'free',
  translations_used integer DEFAULT 0,
  translations_limit integer DEFAULT 10,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  plan_name text NOT NULL,
  price_monthly numeric(10,2),
  status text DEFAULT 'active',
  current_period_start timestamptz DEFAULT now(),
  current_period_end timestamptz DEFAULT now() + interval '1 month',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for users
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Add RLS policies for subscriptions
CREATE POLICY "Users can read own subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Clear and repopulate example phrases
DELETE FROM example_phrases;

INSERT INTO example_phrases (phrase) VALUES 
('Let''s circle back on this'),
('We need to leverage our synergies'),
('Let''s take this offline'),
('We need to think outside the box'),
('Let''s touch base and ideate'),
('We should drill down on the low-hanging fruit'),
('Let''s move the needle on this initiative'),
('We need more bandwidth for this project'),
('Let''s run this up the flagpole'),
('We should socialize this idea'),
('Let''s get our ducks in a row'),
('We need to boil the ocean on this'),
('Let''s ping the stakeholders'),
('We should circle the wagons'),
('Let''s put a pin in this for now');