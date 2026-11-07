-- ==============================================================================
-- OrientEck Restaurant & Café - Supabase Database Schema & Setup Script
-- Project ID: azabnrdnvauuooxwbiyb
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Food Items Table
CREATE TABLE IF NOT EXISTS public.food_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    image_url TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    category_name TEXT NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    variants JSONB DEFAULT '[]'::jsonb,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Customer Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number INT NOT NULL,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    note TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    total NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    payment_method TEXT DEFAULT 'Cash on delivery',
    mode TEXT DEFAULT 'Delivery',
    status TEXT NOT NULL DEFAULT 'Pending', -- Pending, Preparing, On its way, Delivered, Cancelled
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Table Reservations Table
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    guests TEXT NOT NULL,
    reservation_date TEXT NOT NULL,
    reservation_time TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'Pending', -- Pending, Confirmed, Cancelled
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT DEFAULT 'General inquiry',
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread', -- unread, read, replied
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 7. Row Level Security (RLS) Policies
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
DROP POLICY IF EXISTS "Full access to categories" ON public.categories;

DROP POLICY IF EXISTS "Public can view food items" ON public.food_items;
DROP POLICY IF EXISTS "Full access to food items" ON public.food_items;

DROP POLICY IF EXISTS "Anyone can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can view single order by ID" ON public.orders;
DROP POLICY IF EXISTS "Full access to orders" ON public.orders;

DROP POLICY IF EXISTS "Anyone can insert reservations" ON public.reservations;
DROP POLICY IF EXISTS "Full access to reservations" ON public.reservations;

DROP POLICY IF EXISTS "Anyone can insert messages" ON public.messages;
DROP POLICY IF EXISTS "Full access to messages" ON public.messages;

-- Categories Policies
CREATE POLICY "Public can view categories" 
    ON public.categories FOR SELECT 
    USING (true);

CREATE POLICY "Full access to categories" 
    ON public.categories FOR ALL 
    USING (true) WITH CHECK (true);

-- Food Items Policies
CREATE POLICY "Public can view food items" 
    ON public.food_items FOR SELECT 
    USING (true);

CREATE POLICY "Full access to food items" 
    ON public.food_items FOR ALL 
    USING (true) WITH CHECK (true);

-- Orders Policies
CREATE POLICY "Anyone can insert orders" 
    ON public.orders FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Anyone can view single order by ID" 
    ON public.orders FOR SELECT 
    USING (true);

CREATE POLICY "Full access to orders" 
    ON public.orders FOR ALL 
    USING (true) WITH CHECK (true);

-- Reservations Policies
CREATE POLICY "Anyone can insert reservations" 
    ON public.reservations FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Full access to reservations" 
    ON public.reservations FOR ALL 
    USING (true) WITH CHECK (true);

-- Messages Policies
CREATE POLICY "Anyone can insert messages" 
    ON public.messages FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Full access to messages" 
    ON public.messages FOR ALL 
    USING (true) WITH CHECK (true);

-- ==============================================================================
-- 8. Enable Realtime Replication
-- ==============================================================================
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE 
    public.orders, 
    public.reservations, 
    public.messages, 
    public.food_items, 
    public.categories;
COMMIT;

-- ==============================================================================
-- 9. Storage Bucket Setup (for Food Dish Images)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('food-images', 'food-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public can view food images"
ON storage.objects FOR SELECT
USING (bucket_id = 'food-images');

CREATE POLICY "Anyone can upload food images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'food-images');

CREATE POLICY "Anyone can update food images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'food-images');

CREATE POLICY "Anyone can delete food images"
ON storage.objects FOR DELETE
USING (bucket_id = 'food-images');

-- ==============================================================================
-- 10. Initial Seed Data (Authentic OrientEck Specialties)
-- ==============================================================================
INSERT INTO public.categories (name, slug, sort_order) VALUES
('Starters & Mezze', 'starters', 1),
('Grilled Specialties', 'grill', 2),
('Shawarma & Wraps', 'shawarma', 3),
('Main Dishes', 'mains', 4),
('Soups & Salads', 'soups-salads', 5),
('Desserts & Drinks', 'desserts', 6)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.food_items (name, description, price, image_url, category_name, is_available) VALUES
('Taboulé', 'Fresh bulgur salad with parsley, tomatoes, fresh mint, and extra virgin olive oil.', 6.50, 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80', 'Starters & Mezze', true),
('Hummus bi Tahini', 'Traditional creamy chickpea dip blended with tahini, lemon juice and topped with olive oil.', 4.50, 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=600&auto=format&fit=crop&q=80', 'Starters & Mezze', true),
('Hummus bi Lahme', 'Warm, spiced lamb minced meat served over a generous bowl of velvet-smooth hummus.', 6.90, 'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=600&auto=format&fit=crop&q=80', 'Starters & Mezze', true),
('Fattoush Salad', 'Crisp garden salad with crunchy toasted flatbread pieces, sumac and pomegranate dressing.', 6.50, 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80', 'Starters & Mezze', true),
('Stuffed Vine Leaves (Yalanji)', 'Tender grape leaves rolled with aromatic spiced rice, herbs, and lemon zest.', 5.90, 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&auto=format&fit=crop&q=80', 'Starters & Mezze', true),
('OrientEck Mezze Platter', 'Grand sampler platter featuring hummus, baba ghanoush, taboulé, falafel, and pita bread.', 11.90, 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80', 'Starters & Mezze', true),
('Mixed Grill Platter', 'Skewers of marinated chicken shish tawook, tender lamb kebab, and seasoned minced kofta.', 18.50, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80', 'Grilled Specialties', true),
('Shish Tawook Plate', 'Charcoal-grilled marinated chicken breast skewers served with garlic cream and basmati rice.', 14.50, 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80', 'Grilled Specialties', true),
('Chicken Shawarma Platter', 'Slow-roasted chicken shawarma slices served with pickled cucumbers, fries, and garlic dip.', 12.90, 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=600&auto=format&fit=crop&q=80', 'Shawarma & Wraps', true),
('Shawarma Wrap Classic', 'Toasted saj wrap filled with spiced chicken shawarma, garlic toum, and crunchy pickles.', 7.50, 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&auto=format&fit=crop&q=80', 'Shawarma & Wraps', true),
('Crispy Falafel Sandwich', 'Golden chickpea patties in fresh flatbread with tahini, tomatoes, and parsley.', 6.50, 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=600&auto=format&fit=crop&q=80', 'Shawarma & Wraps', true),
('Oriental Baklava Assortment', 'Layers of delicate filo pastry filled with chopped pistachios and sweetened with rosewater syrup.', 5.50, 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&auto=format&fit=crop&q=80', 'Desserts & Drinks', true)
ON CONFLICT DO NOTHING;
