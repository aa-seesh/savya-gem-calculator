
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Flat price if not using dynamic pricing
  images: string[];
  category: string;
  material: string;
  weight: number; // Weight in grams
  makingCharge: number;
  isMakingChargePercentage: boolean;
  isDynamicPricing: boolean;
  inStock: boolean;
  featured: boolean;
  isNew: boolean;
  collection?: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Radiant Lotus Gold Necklace",
    description: "Exquisite 22K gold necklace inspired by the lotus flower, symbolizing purity and beauty. Each petal is delicately crafted with attention to detail.",
    price: 85000,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80",
    ],
    category: "necklace",
    material: "gold-22k",
    weight: 14.5,
    makingCharge: 12,
    isMakingChargePercentage: true,
    isDynamicPricing: true,
    inStock: true,
    featured: true,
    isNew: false,
    collection: "Floral Symphony"
  },
  {
    id: "p2",
    name: "Diamond Constellation Earrings",
    description: "Elegant constellation-inspired diamond earrings set in 18K white gold. The arrangement of diamonds resembles the stars of the night sky.",
    price: 45000,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1319&q=80",
    ],
    category: "earrings",
    material: "gold-18k",
    weight: 6.2,
    makingCharge: 15,
    isMakingChargePercentage: true,
    isDynamicPricing: true,
    inStock: true,
    featured: true,
    isNew: true,
    collection: "Celestial Dreams"
  },
  {
    id: "p3",
    name: "Royal Emerald Ring",
    description: "A stunning ring featuring a central emerald surrounded by diamonds, set in 22K gold. The design is inspired by royal heritage jewelry.",
    price: 65000,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    ],
    category: "rings",
    material: "gold-22k",
    weight: 8.7,
    makingCharge: 18,
    isMakingChargePercentage: true,
    isDynamicPricing: true,
    inStock: true,
    featured: true,
    isNew: false,
    collection: "Royal Heritage"
  },
  {
    id: "p4",
    name: "Silver Infinity Bracelet",
    description: "A delicate silver bracelet featuring the infinity symbol, representing endless possibilities and eternal connection.",
    price: 5500,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    ],
    category: "bracelets",
    material: "silver",
    weight: 15.3,
    makingCharge: 500,
    isMakingChargePercentage: false,
    isDynamicPricing: true,
    inStock: true,
    featured: false,
    isNew: true,
    collection: "Timeless Essentials"
  },
  {
    id: "p5",
    name: "Pearl Harmony Necklace",
    description: "An elegant necklace featuring perfectly cultured pearls with a 18K gold clasp. A classic piece that adds sophistication to any outfit.",
    price: 25000,
    images: [
      "https://images.unsplash.com/photo-1591209662757-ac2eb0abf780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    ],
    category: "necklace",
    material: "gold-18k",
    weight: 12.0,
    makingCharge: 10,
    isMakingChargePercentage: true,
    isDynamicPricing: false,
    inStock: true,
    featured: true,
    isNew: false,
    collection: "Pearl Essence"
  },
  {
    id: "p6",
    name: "Platinum Wedding Band",
    description: "A timeless platinum wedding band with a subtle hammered texture, symbolizing the beautiful journey of marriage.",
    price: 35000,
    images: [
      "https://images.unsplash.com/photo-1607703829739-c05b7beddf60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1517613367530-b0a79a1a7fee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    ],
    category: "rings",
    material: "platinum",
    weight: 6.5,
    makingCharge: 20,
    isMakingChargePercentage: true,
    isDynamicPricing: true,
    inStock: true,
    featured: false,
    isNew: false,
    collection: "Wedding Essentials"
  },
  {
    id: "p7",
    name: "Traditional Gold Anklet",
    description: "Intricately designed traditional anklet crafted in 22K gold, featuring tiny bells that create a melodious sound with every step.",
    price: 28000,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1537832816519-689ad163238b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1159&q=80",
    ],
    category: "anklets",
    material: "gold-22k",
    weight: 9.2,
    makingCharge: 15,
    isMakingChargePercentage: true,
    isDynamicPricing: true,
    inStock: true,
    featured: false,
    isNew: true,
    collection: "Heritage Collection"
  },
  {
    id: "p8",
    name: "Classic Diamond Pendant",
    description: "A timeless solitaire diamond pendant set in 18K white gold, suspended on a delicate chain. Perfect for everyday elegance.",
    price: 18000,
    images: [
      "https://images.unsplash.com/photo-1601821326018-d949a54b6402?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      "https://images.unsplash.com/photo-1575863438850-fb1c06a38884?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1310&q=80",
    ],
    category: "pendants",
    material: "gold-18k",
    weight: 3.5,
    makingCharge: 12,
    isMakingChargePercentage: true,
    isDynamicPricing: false,
    inStock: true,
    featured: true,
    isNew: false,
    collection: "Timeless Essentials"
  }
];

export const collections = [
  {
    id: "c1",
    name: "Floral Symphony",
    description: "Jewelry inspired by the delicate beauty of flowers, crafted with intricate detailing to capture nature's elegance.",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1319&q=80",
  },
  {
    id: "c2",
    name: "Celestial Dreams",
    description: "A collection inspired by the night sky, featuring stars, moons, and celestial patterns that capture cosmic beauty.",
    image: "https://images.unsplash.com/photo-1600721391689-2564bb8055de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
  },
  {
    id: "c3",
    name: "Royal Heritage",
    description: "Luxurious jewelry inspired by royal heritage designs, featuring bold gemstones and intricate craftsmanship.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
  },
  {
    id: "c4",
    name: "Timeless Essentials",
    description: "Classic and versatile jewelry pieces designed to be everyday essentials that never go out of style.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  }
];

export const categories = [
  {
    id: "cat1",
    name: "Necklaces",
    slug: "necklace",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
  },
  {
    id: "cat2",
    name: "Earrings",
    slug: "earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
  },
  {
    id: "cat3",
    name: "Rings",
    slug: "rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "cat4",
    name: "Bracelets",
    slug: "bracelets",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  }
];

export const materialPrices = {
  'gold-24k': 6500, // Price per gram
  'gold-22k': 6000,
  'gold-18k': 5000,
  'silver': 80,
  'platinum': 3500,
  'diamond': 50000, // Price per carat
};
