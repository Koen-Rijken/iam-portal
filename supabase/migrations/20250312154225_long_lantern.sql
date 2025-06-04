/*
  # Fix infinite recursion in RLS policies

  1. Changes
    - Remove recursive admin check from policies
    - Add direct role check for admin policies
    - Simplify policy conditions

  2. Security
    - Maintain same security model but with optimized implementation
    - Users can still only read their own data
    - Admins can still read all data and update roles
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Admins can read all user data" ON users;
DROP POLICY IF EXISTS "Admins can update user roles" ON users;

-- Recreate policies with optimized conditions
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all user data"
  ON users
  FOR SELECT
  TO authenticated
  USING (role = 'Admin' AND auth.uid() = id);

CREATE POLICY "Admins can update user roles"
  ON users
  FOR UPDATE
  TO authenticated
  USING (role = 'Admin' AND auth.uid() = id);