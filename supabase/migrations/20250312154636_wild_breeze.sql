/*
  # Reset Database Schema

  1. Changes
    - Drop existing users table
    - Create new users table with proper structure
    - Set up RLS policies with proper access control

  2. Security
    - Enable RLS on users table
    - Users can read their own data
    - Admins can read and update all data
    - Allow new user creation
*/

-- Drop existing table
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  role text NOT NULL CHECK (role IN ('Admin', 'Customer')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Basic policy for users to read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Admin read policy
CREATE POLICY "Admins can read all data"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'Admin'
    )
  );

-- Admin update policy
CREATE POLICY "Admins can update data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'Admin'
    )
  );

-- Allow user creation
CREATE POLICY "Allow user creation"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (true);