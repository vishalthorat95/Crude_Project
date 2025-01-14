/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (bigint, primary key)
      - `name` (text, not null)
      - `description` (text)
      - `price` (decimal, not null)
      - `category_id` (bigint, foreign key to categories)
      - `created_at` (timestamptz, default: now())

  2. Security
    - Enable RLS on `products` table
    - Add policies for authenticated users to perform CRUD operations
*/

CREATE TABLE IF NOT EXISTS products (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL CHECK (price >= 0),
  category_id bigint NOT NULL REFERENCES categories(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy for reading products
CREATE POLICY "Anyone can read products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for inserting products
CREATE POLICY "Authenticated users can create products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for updating products
CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true);

-- Policy for deleting products
CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);