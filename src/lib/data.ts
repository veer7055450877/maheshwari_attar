// Data Mode Logic
export let PRODUCTION = false;

export const toggleProduction = (status: boolean) => {
  PRODUCTION = status;
  console.log(`System Mode Switched to: ${PRODUCTION ? 'PRODUCTION (MySQL via PHP)' : 'MOCK (JSON)'}`);
};

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  poeticDesc: string;
  notes: { top: string[]; heart: string[]; base: string[]; };
  image: string;
  price: string;
  category: string;
  intensity: string;
  occasion: string;
  status: 'Active' | 'Draft' | 'Hidden';
}

export interface Testimonial {
  id: number;
  name: string;
  message: string;
  role: string;
  rating: number;
  approved: boolean;
}

export interface Order {
  id: string;
  date: string;
  amount: number;
  status: string;
  customerName?: string;
  productName?: string;
}

export interface Enquiry {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
}

export interface Media {
  id: number;
  url: string;
  name: string;
}

// --- STATEFUL MOCK DATA (Persists during frontend session) ---
let MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Royal Oud",
    slug: "royal-oud",
    description: "Deep, woody, and intensely masculine.",
    poeticDesc: "A whisper of ancient forests.",
    notes: {
      top: ["Saffron", "Nutmeg"],
      heart: ["Agarwood (Oud)", "Patchouli"],
      base: ["Amber", "Musk"],
    },
    image:
      "https://assets.myntassets.com/w_360,q_50,,dpr_2,fl_progressive,f_webp/assets/images/2025/NOVEMBER/10/RXh16shO_541c29e0289e47878dae300ef6a5bd6d.jpg",
    price: "$350",
    category: "Oud",
    intensity: "Strong",
    occasion: "Evening",
    status: "Active",
  },
  {
    id: 2,
    name: "Damascus Rose",
    slug: "damascus-rose",
    description: "The queen of flowers.",
    poeticDesc: "Velvet petals unfolding in the midnight air.",
    notes: {
      top: ["Dew Drop", "Pink Pepper"],
      heart: ["Damask Rose", "Geranium"],
      base: ["White Musk", "Sandalwood"],
    },
    image:
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=2574&auto=format&fit=crop",
    price: "$280",
    category: "Rose",
    intensity: "Moderate",
    occasion: "Day",
    status: "Active",
  },
];

let MOCK_TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Aarav S.", role: "Mumbai", message: "The scent of royalty. Absolutely divine.", rating: 5, approved: true },
  { id: 2, name: "Elena R.", role: "Paris", message: "Lasts for days. A work of art.", rating: 5, approved: true }
];

let MOCK_ORDERS: Order[] = [
  { id: "ORD-001", date: "2025-10-01", amount: 350, status: "Delivered" },
  { id: "ORD-002", date: "2025-10-02", amount: 700, status: "Processing" },
];

let MOCK_ENQUIRIES: Enquiry[] = [];

let MOCK_MEDIA: Media[] = [
  { id: 1, name: "Oud Bottle", url: "https://images.unsplash.com/photo-1594035910387-fea4779426e9?q=80&w=2536&auto=format&fit=crop" },
  { id: 2, name: "Rose Extract", url: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=2574&auto=format&fit=crop" }
];

let MOCK_COLLECTIONS = [
  { id: 1, name: "Signature Series", count: 12, status: "Active" },
  { id: 2, name: "Royal Heritage", count: 5, status: "Active" }
];

// --- CRUD OPERATIONS ---

const API_BASE = '/backend/api.php';

export const getData = async (type: string) => {
  if (!PRODUCTION) {
    if (type === 'products') return [...MOCK_PRODUCTS];
    if (type === 'testimonials') return [...MOCK_TESTIMONIALS];
    if (type === 'orders') return [...MOCK_ORDERS];
    if (type === 'enquiries') return [...MOCK_ENQUIRIES];
    if (type === 'media') return [...MOCK_MEDIA];
    if (type === 'collections') return [...MOCK_COLLECTIONS];
    return [];
  } else {
    try {
      const res = await fetch(`${API_BASE}?type=${type}`);
      return await res.json();
    } catch (e) {
      console.error("DB Fetch Error:", e);
      return [];
    }
  }
};

export const addData = async (type: string, payload: any) => {
  if (!PRODUCTION) {
    const newItem = { ...payload, id: type === 'orders' ? `ORD-${Date.now()}` : Date.now(), date: new Date().toISOString() };
    if (type === 'products') MOCK_PRODUCTS = [newItem, ...MOCK_PRODUCTS];
    if (type === 'testimonials') MOCK_TESTIMONIALS = [newItem, ...MOCK_TESTIMONIALS];
    if (type === 'media') MOCK_MEDIA = [newItem, ...MOCK_MEDIA];
    if (type === 'enquiries') MOCK_ENQUIRIES = [newItem, ...MOCK_ENQUIRIES];
    if (type === 'orders') MOCK_ORDERS = [newItem, ...MOCK_ORDERS];
    return newItem;
  } else {
    const res = await fetch(`${API_BASE}?type=${type}`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return await res.json();
  }
};

export const updateData = async (type: string, id: number | string, payload: any) => {
  if (!PRODUCTION) {
    if (type === 'products') MOCK_PRODUCTS = MOCK_PRODUCTS.map(p => p.id === id ? { ...p, ...payload } : p);
    return { success: true };
  } else {
    const res = await fetch(`${API_BASE}?type=${type}&id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    return await res.json();
  }
};

export const deleteData = async (type: string, id: number | string) => {
  if (!PRODUCTION) {
    if (type === 'products') MOCK_PRODUCTS = MOCK_PRODUCTS.filter(p => p.id !== id);
    if (type === 'testimonials') MOCK_TESTIMONIALS = MOCK_TESTIMONIALS.filter(p => p.id !== id);
    if (type === 'media') MOCK_MEDIA = MOCK_MEDIA.filter(p => p.id !== id);
    return { success: true };
  } else {
    const res = await fetch(`${API_BASE}?type=${type}&id=${id}`, { method: 'DELETE' });
    return await res.json();
  }
};
