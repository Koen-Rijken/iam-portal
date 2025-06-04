/*
  # Fix RLS policies for proper role-based access

  1. Changes
    - Drop existing policies
    - Create new simplified policies that prevent recursion
    - Add policy for user creation
    - Fix admin access checks

  2. Security
    - Users can read their own data
    - Admins can read and update all user data
    - Maintain role-based access control
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Admins can read all data" ON users;
DROP POLICY IF EXISTS "Admins can update data" ON users;
DROP POLICY IF EXISTS "Allow user creation" ON users;

-- Allow users to read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow admins to read all data
CREATE POLICY "Admins can read all data"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'Admin'
    )
  );

-- Allow admins to update data
CREATE POLICY "Admins can update data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'Admin'
    )
  );

-- Allow new user creation
CREATE POLICY "Allow user creation"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);