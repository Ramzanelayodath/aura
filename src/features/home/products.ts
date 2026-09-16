export type Product = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  rating: string;
  reviews: string;
  badge?: { label: string; variant: 'light' | 'dark' };
  wishlisted: boolean;
  thumbnail?: string;
};

export const products: Product[] = [
  {
    id: '1',
    title: 'Kanso Ceramic Vase',
    subtitle: 'Matte sand glaze • 24cm',
    price: '$85',
    rating: '4.9',
    reviews: '(128)',
    badge: { label: 'Best Seller', variant: 'light' },
    wishlisted: true,
  },
  {
    id: '2',
    title: 'Lumen Brass Table Lamp',
    subtitle: 'Dimmable warm LED • Brushed brass',
    price: '$180',
    rating: '4.8',
    reviews: '(42)',
    badge: { label: 'New', variant: 'dark' },
    wishlisted: false,
  },
  {
    id: '3',
    title: 'Nordic Wool Throw Blanket',
    subtitle: 'Handwoven oat fleece • 130x180',
    price: '$120',
    rating: '5.0',
    reviews: '(64)',
    badge: { label: 'Limited', variant: 'dark' },
    wishlisted: false,
  },
  {
    id: '4',
    title: 'Sora Sculptural Carafe & Glass',
    subtitle: 'Borosilicate smoke • Set of 2',
    price: '$64',
    rating: '4.7',
    reviews: '(19)',
    wishlisted: false,
  },
  {
    id: '5',
    title: 'Solstice Terracotta Planter',
    subtitle: 'Handcrafted clay • Drainage tray',
    price: '$48',
    rating: '4.9',
    reviews: '(91)',
    wishlisted: false,
  },
  {
    id: '6',
    title: 'Forma Stool in Solid Oak',
    subtitle: 'Natural oil finish • FSC certified',
    price: '$240',
    rating: '4.9',
    reviews: '(38)',
    wishlisted: false,
  },
];

export const categoryChips = [
  { id: 'all', label: 'All Objects', active: true },
  { id: 'lighting', label: 'Lighting', active: false },
  { id: 'ceramics', label: 'Ceramics', active: false, accent: true },
  { id: 'seating', label: 'Seating', active: false },
  { id: 'aromatics', label: 'Aromatics', active: false },
  { id: 'textiles', label: 'Textiles', active: false },
];

export const activeFilters = [
  { id: 'price', label: 'Price: $50–$300' },
  { id: 'material', label: 'Material: Ceramic' },
  { id: 'stock', label: 'In Stock' },
];
