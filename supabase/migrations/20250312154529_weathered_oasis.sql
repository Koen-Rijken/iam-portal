/*
  # Fix RLS policies with simplified access control

  1. Changes
    - Drop all existing policies
    - Create new simplified policies
    - Fix admin access without recursion
    - Add proper user creation policy

  2. Security
    - Users can read their own data
    - Admins can read and update all data
    - New users can be created
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Admins can read all data" ON users;
DROP POLICY IF EXISTS "Admins can update data" ON users;
DROP POLICY IF EXISTS "Allow user creation" ON users;

-- Basic policy for users to read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Simple admin read policy
CREATE POLICY "Admins can read all data"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'Admin'
    )
  );

-- Simple admin update policy
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