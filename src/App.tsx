import { useEffect } from 'react';
import { SupabaseService, SupabaseFoodItem } from './supabase';

export default function App() {
  // Sync Supabase Food Items with the customer-facing Menu & Food Order pages in index.html
  const syncFoodMenuWithWebsite = (items: SupabaseFoodItem[]) => {
    if (!items || items.length === 0) return;
    if (typeof window !== 'undefined' && (window as any).OrientEckApplyMenu) {
      const formatted = items.map((f, i) => {
        let imgs: string[] = [];
        if (Array.isArray(f.images) && f.images.length > 0) {
          imgs = f.images;
        } else if (typeof f.image_url === 'string' && f.image_url.trim().startsWith('[')) {
          try {
            const parsed = JSON.parse(f.image_url);
            if (Array.isArray(parsed) && parsed.length > 0) imgs = parsed;
          } catch (e) {
            imgs = [f.image_url];
          }
        } else if (f.image_url) {
          imgs = [f.image_url];
        }

        return {
          id: f.id,
          name: f.name,
          desc: f.description,
          description: f.description,
          price: Number(f.price),
          cat: f.category_name,
          category: f.category_name,
          cid: f.category_name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          categoryId: f.category_name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          available: f.is_available,
          av: f.is_available,
          image: imgs[0] || f.image_url || '',
          images: imgs,
          sortOrder: f.sort_order ?? i,
          variants: f.variants || [],
        };
      });

      (window as any).OrientEckApplyMenu(formatted);
    }
  };

  useEffect(() => {
    // 1. Initial fetch from Supabase
    const initMenu = async () => {
      try {
        const food = await SupabaseService.getFoodItems();
        if (food && food.length > 0) {
          syncFoodMenuWithWebsite(food);
        }
      } catch (e) {
        console.warn('Supabase menu sync note:', e);
      }
    };

    const timer = setTimeout(initMenu, 300);

    // Re-sync whenever user focuses the tab or window becomes visible
    const onFocus = () => initMenu();
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') initMenu();
    });

    // 2. Real-time subscription to food_items table for instant website synchronization
    const foodChannel = SupabaseService.subscribeToTable('food_items', async () => {
      try {
        const updated = await SupabaseService.getFoodItems();
        syncFoodMenuWithWebsite(updated);
      } catch (err) {
        console.error('Error synchronizing real-time food menu:', err);
      }
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('focus', onFocus);
      foodChannel.unsubscribe();
    };
  }, []);

  // Customer-facing website stays 100% identical to original design without any added overlays
  return null;
}
