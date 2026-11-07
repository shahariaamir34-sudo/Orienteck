import { createClient, RealtimeChannel } from '@supabase/supabase-js';

// Supabase Project Credentials provided by user
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://azabnrdnvauuooxwbiyb.supabase.co';
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_WuB6c8IKpD3cia-Pt0cqcA_kxlyW-Ud';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Database Interfaces
export interface SupabaseFoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  images?: string[];
  category_id?: string | null;
  category_name: string;
  is_available: boolean;
  variants?: any[];
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseCategory {
  id: string;
  name: string;
  slug: string;
  sort_order?: number;
  created_at?: string;
}

export interface SupabaseOrder {
  id: string;
  order_number: number;
  customer_name: string;
  phone: string;
  address: string;
  note?: string;
  items: Array<{
    name: string;
    variant?: string | null;
    qty: number;
    unit: number;
  }>;
  total: number;
  payment_method: string;
  mode: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseReservation {
  id: string;
  customer_name: string;
  email?: string;
  phone: string;
  guests: string;
  reservation_date: string;
  reservation_time: string;
  notes?: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseMessage {
  id: string;
  customer_name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

// Fallback initial menu items so the site and admin panel are never empty
export const INITIAL_MENU_SEED: Omit<SupabaseFoodItem, 'id'>[] = [
  {
    name: 'Taboulé',
    description: 'Fresh bulgur salad with parsley, tomatoes, fresh mint, and extra virgin olive oil.',
    price: 6.50,
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    category_name: 'Starters & Mezze',
    is_available: true,
    sort_order: 1,
  },
  {
    name: 'Hummus bi Tahini',
    description: 'Traditional creamy chickpea dip blended with tahini, lemon juice and topped with olive oil.',
    price: 4.50,
    image_url: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=600&auto=format&fit=crop&q=80',
    category_name: 'Starters & Mezze',
    is_available: true,
    sort_order: 2,
  },
  {
    name: 'Hummus bi Lahme',
    description: 'Warm, spiced lamb minced meat served over a generous bowl of velvet-smooth hummus.',
    price: 6.90,
    image_url: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=600&auto=format&fit=crop&q=80',
    category_name: 'Starters & Mezze',
    is_available: true,
    sort_order: 3,
  },
  {
    name: 'Fattoush Salad',
    description: 'Crisp garden salad with crunchy toasted flatbread pieces, sumac and pomegranate dressing.',
    price: 6.50,
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    category_name: 'Starters & Mezze',
    is_available: true,
    sort_order: 4,
  },
  {
    name: 'Stuffed Vine Leaves (Yalanji)',
    description: 'Tender grape leaves rolled with aromatic spiced rice, herbs, and lemon zest.',
    price: 5.90,
    image_url: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&auto=format&fit=crop&q=80',
    category_name: 'Starters & Mezze',
    is_available: true,
    sort_order: 5,
  },
  {
    name: 'OrientEck Mezze Platter',
    description: 'Grand sampler platter featuring hummus, baba ghanoush, taboulé, falafel, and pita bread.',
    price: 11.90,
    image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    category_name: 'Starters & Mezze',
    is_available: true,
    sort_order: 6,
  },
  {
    name: 'Mixed Grill Platter',
    description: 'Skewers of marinated chicken shish tawook, tender lamb kebab, and seasoned minced kofta.',
    price: 18.50,
    image_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80',
    category_name: 'Grilled Specialties',
    is_available: true,
    sort_order: 7,
  },
  {
    name: 'Shish Tawook Plate',
    description: 'Charcoal-grilled marinated chicken breast skewers served with garlic cream and basmati rice.',
    price: 14.50,
    image_url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80',
    category_name: 'Grilled Specialties',
    is_available: true,
    sort_order: 8,
  },
  {
    name: 'Chicken Shawarma Platter',
    description: 'Slow-roasted chicken shawarma slices served with pickled cucumbers, fries, and garlic dip.',
    price: 12.90,
    image_url: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=600&auto=format&fit=crop&q=80',
    category_name: 'Shawarma & Wraps',
    is_available: true,
    sort_order: 9,
  },
  {
    name: 'Shawarma Wrap Classic',
    description: 'Toasted saj wrap filled with spiced chicken shawarma, garlic toum, and crunchy pickles.',
    price: 7.50,
    image_url: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&auto=format&fit=crop&q=80',
    category_name: 'Shawarma & Wraps',
    is_available: true,
    sort_order: 10,
  },
  {
    name: 'Crispy Falafel Sandwich',
    description: 'Golden chickpea patties in fresh flatbread with tahini, tomatoes, and parsley.',
    price: 6.50,
    image_url: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=600&auto=format&fit=crop&q=80',
    category_name: 'Shawarma & Wraps',
    is_available: true,
    sort_order: 11,
  },
  {
    name: 'Oriental Baklava Assortment',
    description: 'Layers of delicate filo pastry filled with chopped pistachios and sweetened with rosewater syrup.',
    price: 5.50,
    image_url: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&auto=format&fit=crop&q=80',
    category_name: 'Desserts & Drinks',
    is_available: true,
    sort_order: 12,
  },
];

// Unified Supabase Service for Customer Website & Admin Panel
export const SupabaseService = {
  // =========================================================================
  // 1. Customer Food Order System
  // =========================================================================
  async createOrder(payload: {
    orderNumber: number;
    name: string;
    phone: string;
    address: string;
    note?: string;
    items: any[];
    total: number;
    paymentMethod?: string;
    mode?: string;
    status?: string;
  }): Promise<string> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            order_number: payload.orderNumber,
            customer_name: payload.name,
            phone: payload.phone,
            address: payload.address,
            note: payload.note || '',
            items: payload.items || [],
            total: payload.total,
            payment_method: payload.paymentMethod || 'Cash on delivery',
            mode: payload.mode || 'Delivery',
            status: payload.status || 'New',
          },
        ])
        .select('id')
        .single();

      if (error) {
        console.error('Supabase createOrder error:', error);
        return 'ord_' + Math.random().toString(36).substring(2, 9);
      }
      return data?.id || String(payload.orderNumber);
    } catch (err) {
      console.error('createOrder exception:', err);
      return 'ord_' + Math.random().toString(36).substring(2, 9);
    }
  },

  subscribeOrder(orderId: string, callback: (order: any) => void): () => void {
    const channel = supabase
      .channel(`order_${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          if (payload && payload.new) {
            callback(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  // =========================================================================
  // 2. Customer Table Reservation System
  // =========================================================================
  async createReservation(payload: {
    name: string;
    email?: string;
    phone: string;
    guests: string;
    date: string;
    time: string;
    notes?: string;
    status?: string;
  }): Promise<string> {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .insert([
          {
            customer_name: payload.name,
            email: payload.email || '',
            phone: payload.phone,
            guests: String(payload.guests),
            reservation_date: payload.date,
            reservation_time: payload.time,
            notes: payload.notes || '',
            status: payload.status || 'New',
          },
        ])
        .select('id')
        .single();

      if (error) {
        console.error('Supabase createReservation error:', error);
        return 'res_' + Math.random().toString(36).substring(2, 9);
      }
      return data?.id || 'res_ok';
    } catch (err) {
      console.error('createReservation exception:', err);
      return 'res_' + Math.random().toString(36).substring(2, 9);
    }
  },

  // =========================================================================
  // 3. Customer Contact Message System
  // =========================================================================
  async createMessage(payload: {
    firstName?: string;
    lastName?: string;
    name?: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    status?: string;
  }): Promise<string> {
    try {
      const fullName =
        payload.name ||
        `${payload.firstName || ''} ${payload.lastName || ''}`.trim() ||
        'Customer';

      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            customer_name: fullName,
            email: payload.email,
            phone: payload.phone || '',
            subject: payload.subject || 'General inquiry',
            message: payload.message,
            status: payload.status || 'New',
          },
        ])
        .select('id')
        .single();

      if (error) {
        console.error('Supabase createMessage error:', error);
        return 'msg_' + Math.random().toString(36).substring(2, 9);
      }
      return data?.id || 'msg_ok';
    } catch (err) {
      console.error('createMessage exception:', err);
      return 'msg_' + Math.random().toString(36).substring(2, 9);
    }
  },

  // =========================================================================
  // 4. Admin Panel Methods (Dishes, Orders, Reservations, Messages)
  // =========================================================================
  async fetchDishesList(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('food_items')
        .select('*')
        .order('sort_order', { ascending: true });

      const parseImgs = (raw: string | undefined): string[] => {
        if (!raw) return [];
        const s = String(raw).trim();
        if (s.startsWith('[')) {
          try {
            const arr = JSON.parse(s);
            if (Array.isArray(arr) && arr.length > 0) return arr;
          } catch (e) {}
        }
        return [s];
      };

      if (error || !data || data.length === 0) {
        if (error) console.warn('fetchDishesList note:', error.message);
        return INITIAL_MENU_SEED.map((item, idx) => ({
          id: `seed_${idx + 1}`,
          name: item.name,
          category: item.category_name,
          categoryId: item.category_name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          description: item.description,
          price: Number(item.price) || 0,
          quantity: 50,
          available: item.is_available,
          visible: true,
          image: item.image_url,
          images: [item.image_url],
          sortOrder: item.sort_order ?? idx,
          variants: item.variants || [],
        }));
      }

      return data.map((item, idx) => {
        const imgs = parseImgs(item.image_url);
        return {
          id: item.id,
          name: item.name,
          category: item.category_name || 'Starters & Mezze',
          categoryId: item.category_id || (item.category_name || 'other').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          description: item.description || '',
          price: Number(item.price) || 0,
          quantity: 50,
          available: item.is_available !== false,
          visible: true,
          image: imgs[0] || '',
          images: imgs,
          sortOrder: item.sort_order ?? idx,
          variants: item.variants || [],
        };
      });
    } catch (err) {
      console.error('fetchDishesList exception:', err);
      return [];
    }
  },

  async fetchOrdersList(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('fetchOrdersList error:', error.message);
        return [];
      }

      return (data || []).map((order) => ({
        id: order.id,
        nr: order.order_number,
        orderNumber: order.order_number,
        name: order.customer_name,
        phone: order.phone,
        address: order.address,
        note: order.note || '',
        items: Array.isArray(order.items) ? order.items : [],
        total: Number(order.total) || 0,
        payment: order.payment_method || 'Cash on delivery',
        paymentMethod: order.payment_method || 'Cash on delivery',
        mode: order.mode || 'Delivery',
        status: order.status || 'New',
        createdAt: order.created_at || new Date().toISOString(),
      }));
    } catch (err) {
      console.error('fetchOrdersList exception:', err);
      return [];
    }
  },

  async fetchReservationsList(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('fetchReservationsList error:', error.message);
        return [];
      }

      return (data || []).map((res) => ({
        id: res.id,
        name: res.customer_name,
        email: res.email || '',
        phone: res.phone || '',
        guests: String(res.guests || '2'),
        date: res.reservation_date,
        time: res.reservation_time,
        notes: res.notes || '',
        status: res.status || 'New',
        createdAt: res.created_at || new Date().toISOString(),
      }));
    } catch (err) {
      console.error('fetchReservationsList exception:', err);
      return [];
    }
  },

  async fetchMessagesList(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('fetchMessagesList error:', error.message);
        return [];
      }

      return (data || []).map((msg) => {
        const parts = (msg.customer_name || 'Customer').trim().split(/\s+/);
        const firstName = parts[0] || 'Customer';
        const lastName = parts.slice(1).join(' ') || '';
        return {
          id: msg.id,
          firstName,
          lastName,
          email: msg.email || '',
          phone: msg.phone || '',
          subject: msg.subject || 'General inquiry',
          message: msg.message || '',
          status: msg.status || 'New',
          createdAt: msg.created_at || new Date().toISOString(),
        };
      });
    } catch (err) {
      console.error('fetchMessagesList exception:', err);
      return [];
    }
  },

  async saveDishItem(body: any): Promise<string> {
    try {
      let finalImg = body.image || '';
      if (Array.isArray(body.images) && body.images.length > 0) {
        finalImg = body.images.length === 1 ? body.images[0] : JSON.stringify(body.images);
      }

      const dishData = {
        name: body.name,
        description: body.description || '',
        price: Number(body.price) || 0,
        category_name: body.category || 'Starters & Mezze',
        is_available: body.available !== false,
        image_url: finalImg,
        sort_order: Number(body.sortOrder) || 0,
        variants: body.variants || [],
        updated_at: new Date().toISOString(),
      };

      if (body.id && !String(body.id).startsWith('seed_')) {
        const { error } = await supabase
          .from('food_items')
          .update(dishData)
          .eq('id', body.id);

        if (error) {
          console.error('saveDishItem update error:', error);
          throw error;
        }
        return body.id;
      } else {
        const { data, error } = await supabase
          .from('food_items')
          .insert([dishData])
          .select('id')
          .single();

        if (error) {
          console.error('saveDishItem insert error:', error);
          throw error;
        }
        return data?.id || 'dish_' + Date.now();
      }
    } catch (err) {
      console.error('saveDishItem exception:', err);
      throw err;
    }
  },

  async deleteDish(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('food_items').delete().eq('id', id);
      if (error) {
        console.error('deleteDish error:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('deleteDish exception:', err);
      return false;
    }
  },

  async updateOrderStatus(id: string, status: string): Promise<boolean> {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('updateOrderStatus error:', error);
      return false;
    }
    return true;
  },

  async updateReservationStatus(id: string, status: string): Promise<boolean> {
    const { error } = await supabase
      .from('reservations')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('updateReservationStatus error:', error);
      return false;
    }
    return true;
  },

  async updateMessageStatus(id: string, status: string): Promise<boolean> {
    const { error } = await supabase
      .from('messages')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('updateMessageStatus error:', error);
      return false;
    }
    return true;
  },

  // Real-time Supabase subscriptions
  subscribeOrders(callback: (orders: any[]) => void): () => void {
    const channel = supabase
      .channel('realtime_admin_orders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        async () => {
          try {
            const list = await SupabaseService.fetchOrdersList();
            callback(list);
          } catch (e) {
            console.error('Realtime orders callback error:', e);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  subscribeReservations(callback: (reservations: any[]) => void): () => void {
    const channel = supabase
      .channel('realtime_admin_reservations')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'reservations' },
        async () => {
          try {
            const list = await SupabaseService.fetchReservationsList();
            callback(list);
          } catch (e) {
            console.error('Realtime reservations callback error:', e);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  subscribeMessages(callback: (messages: any[]) => void): () => void {
    const channel = supabase
      .channel('realtime_admin_messages')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        async () => {
          try {
            const list = await SupabaseService.fetchMessagesList();
            callback(list);
          } catch (e) {
            console.error('Realtime messages callback error:', e);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  subscribeDishes(callback: (dishes: any[]) => void): () => void {
    const channel = supabase
      .channel('realtime_admin_dishes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'food_items' },
        async () => {
          try {
            const list = await SupabaseService.fetchDishesList();
            callback(list);
          } catch (e) {
            console.error('Realtime dishes callback error:', e);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  // CRUD helpers
  async getOrders(): Promise<SupabaseOrder[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('getOrders warning:', error.message);
      return [];
    }
    return data || [];
  },

  async deleteOrder(id: string): Promise<boolean> {
    const { error } = await supabase.from('orders').delete().eq('id', id);
    return !error;
  },

  async getReservations(): Promise<SupabaseReservation[]> {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('getReservations warning:', error.message);
      return [];
    }
    return data || [];
  },

  async deleteReservation(id: string): Promise<boolean> {
    const { error } = await supabase.from('reservations').delete().eq('id', id);
    return !error;
  },

  async getMessages(): Promise<SupabaseMessage[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('getMessages warning:', error.message);
      return [];
    }
    return data || [];
  },

  async deleteMessage(id: string): Promise<boolean> {
    const { error } = await supabase.from('messages').delete().eq('id', id);
    return !error;
  },

  async getCategories(): Promise<SupabaseCategory[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('getCategories warning:', error.message);
      return [];
    }
    return data || [];
  },

  async addCategory(name: string): Promise<SupabaseCategory | null> {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const { data, error } = await supabase
      .from('categories')
      .insert([{ name, slug }])
      .select('*')
      .single();

    if (error) {
      console.error('addCategory error:', error);
      return null;
    }
    return data;
  },

  async deleteCategory(id: string): Promise<boolean> {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    return !error;
  },

  async getFoodItems(): Promise<SupabaseFoodItem[]> {
    const { data, error } = await supabase
      .from('food_items')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('getFoodItems warning:', error.message);
      return [];
    }

    return (data || []).map((item) => {
      let imgs: string[] = [];
      const s = String(item.image_url || '').trim();
      if (s.startsWith('[')) {
        try {
          const parsed = JSON.parse(s);
          if (Array.isArray(parsed) && parsed.length > 0) imgs = parsed;
        } catch (e) {}
      } else if (s) {
        imgs = [s];
      }
      return {
        ...item,
        images: imgs,
        image_url: imgs[0] || item.image_url || '',
      };
    });
  },

  async addFoodItem(item: Omit<SupabaseFoodItem, 'id'>): Promise<SupabaseFoodItem | null> {
    const { data, error } = await supabase
      .from('food_items')
      .insert([item])
      .select('*')
      .single();

    if (error) {
      console.error('addFoodItem error:', error);
      return null;
    }
    return data;
  },

  async updateFoodItem(id: string, updates: Partial<SupabaseFoodItem>): Promise<boolean> {
    const { error } = await supabase
      .from('food_items')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id);

    return !error;
  },

  async deleteFoodItem(id: string): Promise<boolean> {
    const { error } = await supabase.from('food_items').delete().eq('id', id);
    return !error;
  },

  subscribeToTable(
    table: 'orders' | 'reservations' | 'messages' | 'food_items' | 'categories',
    onChange: () => void
  ): RealtimeChannel {
    return supabase
      .channel(`public_${table}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        () => {
          onChange();
        }
      )
      .subscribe();
  },
};

// Expose directly to window for seamless integration with index.html and admin.html
if (typeof window !== 'undefined') {
  (window as any).dbService = SupabaseService;
  (window as any).OrientEckDb = SupabaseService;
  (window as any).supabase = supabase;

  // Dispatch custom event to notify listeners immediately
  window.dispatchEvent(
    new CustomEvent('dbservice:ready', { detail: SupabaseService })
  );
}
