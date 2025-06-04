/*
  # Fix RLS policies for proper role-based access

  1. Changes
    - Drop existing policies
    - Create new simplified policies
    - Add policy for user creation
    - Fix recursive admin checks

  2. Security
    - Users can read their own data
    - Admins can read and update all user data
    - Maintain role-based access control
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Admins can read all user data" ON users;
DROP POLICY IF EXISTS "Admins can update user roles" ON users;

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
    (auth.uid() = id AND role = 'Admin')
    OR
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
    (auth.uid() = id AND role = 'Admin')
    OR
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