// Real Graphic Design Portfolio Projects for Dani
// Verified and extracted from C:\BackUp\Dani assets

export interface DocumentPage {
  pageNumber: number;
  image: string;
  thumbnail: string;
  title?: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  coverImage: string;
  featured: boolean;
  award?: string;
  metrics?: string;
  description: string;
  dominantColors: string[];
  ambientColor: string;
  aspectRatio: number;
  tags: string[];
  gallery?: string[];
  sourceFile?: string;
  targetRel?: string;
  isDocument?: boolean;
  documentPages?: DocumentPage[];
}

export const CATEGORIES = [
  "All",
  "Media Pack",
  "Broadcasting & Visual Identity",
  "Branding & Identity",
  "Packaging Design",
  "Poster & Key Art",
  "Printing & Editorial",
  "Digital & Thumbnail Design"
] as const;

export type Category = typeof CATEGORIES[number];

// Generate 37 Media Pack pages
export const MEDIA_PACK_PAGES: DocumentPage[] = Array.from({ length: 37 }, (_, i) => {
  const pageNum = i + 1;
  const pageStr = String(pageNum).padStart(3, "0");
  
  const pageTitles: Record<number, string> = {
    1: "Cover: Abbay TV Official Media Pack",
    2: "Broadcast Network Profile & Channel Architecture",
    3: "Company Profile: About Abbay TV",
    4: "Audience Demographics & 36.7M+ Digital Reach",
    5: "Abbay Kidame Saturday Variety Package",
    6: "Abbay Kidame Commercial Rate Structure",
    7: "Sunday Agelgel: Washehu Ende Comedy",
    8: "Sunday Agelgel: Sew Le Sew Social Impact",
    9: "Sunday Agelgel: Mesenqo Musical Heritage",
    10: "Sunday Agelgel: Man Yikenes 100K Quiz",
    11: "Sunday Agelgel: Seleme Seleme Dance",
    12: "Sunday Agelgel Multi-Show Sponsorship",
    13: "Sekela Talk Show Celebrity Interviews",
    14: "Sekela Talk Show Commercial Pricing",
    15: "Premium Series: Chef Z Majet Culinary",
    16: "Investigative & Legal Rights Architecture",
    17: "Premium Broadcast Sponsorship Package",
    18: "Prime Time: Legal, Health & Family Shows",
    19: "Prime Time: ENDF & Ye Ewket Almazoch",
    20: "Prime Time: Medalia Sports & Maraki Weg",
    21: "Prime Time Commercial Rate Architecture",
    22: "News & Current Affairs: Abbay Zena",
    23: "Event Documentaries & Business Showcases",
    24: "Corporate Partnership Frameworks",
    25: "Campaign Distribution Matrix",
    26: "Broadcast Tier Deliverables",
    27: "Digital Media Cross-Pollination",
    28: "Program Airtime Grid & Prime Slots",
    29: "Multi-Platform Audience Strategy",
    30: "Social Content Production Rates",
    31: "TikTok Broadcast Advertising Packages",
    32: "Facebook Multi-Tier Advertising",
    33: "Abbay TV Partnership Office & Direct Lines",
    34: "Abbay Digital: AI, CGI & Production Studio",
    35: "Abbay Digital: Vision For The Future",
    36: "Abbay Digital: CGI, VFX & Commercial Services",
    37: "Why Choose Abbay Media Group & Contacts"
  };

  return {
    pageNumber: pageNum,
    image: `/images/media-pack/media-pack-page-${pageStr}.png`,
    thumbnail: `/images/media-pack/thumbs/media-pack-thumb-${pageStr}.jpg`,
    title: pageTitles[pageNum] || `Page ${pageNum}`
  };
});

export const PROJECTS: Project[] = [
  // --- DEDICATED MEDIA PACK PROJECT ---
  {
    id: "abbay-media-pack-complete",
    title: "Abbay TV & Abbay Digital Official Media Pack",
    client: "Abbay TV & Abbay Digital",
    category: "Media Pack",
    year: "2025 - 2026",
    coverImage: "/images/media-pack/cover.png",
    featured: true,
    isDocument: true,
    award: "Comprehensive 37-Spread Corporate Media Kit",
    metrics: "37 High-Resolution Spreads · Complete Broadcast Rate Card",
    description: "Complete 37-page corporate media pack and broadcast design system for Ethiopia's top-rated television network and creative production powerhouse. Includes verified viewership metrics, program packages, AI production capabilities, and commercial sponsorship rate cards.",
    dominantColors: ["#001E4A", "#D4AF37", "#FFFFFF"],
    ambientColor: "rgba(212, 175, 55, 0.45)",
    aspectRatio: 1.41,
    tags: ["Media Pack", "Corporate Profile", "Rate Card", "Broadcast Design", "37 Pages"],
    documentPages: MEDIA_PACK_PAGES
  },
  // --- BRANDING & BROADCASTING PROJECTS ---
  {
    id: "abbay-tv-branding",
    title: "Abbay TV Broadcast Identity & On-Air Graphics",
    client: "Abbay TV",
    category: "Broadcasting & Visual Identity",
    year: "2025 - 2026",
    coverImage: "/portfolio/branding/abbay_tv_identity.webp",
    featured: true,
    award: "Flagship Broadcast Identity & Graphics Suite",
    metrics: "36.7M+ Digital Views · 4.5M Viewers · 906K+ Subscribers",
    description: "Complete broadcast identity redesign, brand guidelines, and corporate identity suite for Ethiopia's premier television network and award-winning broadcaster.",
    dominantColors: ["#0E0A05", "#D4AF37", "#F7E3B1"],
    ambientColor: "rgba(212, 175, 55, 0.35)",
    aspectRatio: 1.78,
    tags: ["Broadcast Identity", "Television", "Brand System", "Media Pack"],
    gallery: [
      "/images/media-pack/media-pack-page-002.png",
      "/images/media-pack/media-pack-page-004.png",
      "/images/media-pack/media-pack-page-034.png",
      "/images/media-pack/media-pack-page-036.png"
    ]
  },
  {
    id: "ablex-branding",
    title: "Ablex (Ablene Berhane) Musician & Creator Identity",
    client: "Ablex / Abol Channel",
    category: "Branding & Identity",
    year: "2025",
    coverImage: "/portfolio/branding/ablex_branding.webp",
    featured: true,
    award: "Nominated Addis Music Award 2025",
    metrics: "Over 3 Million YouTube Views on 'Keberaraye'",
    description: "Dynamic personal brand identity, typography, and visual assets for celebrated musician and digital creator Ablene Berhane ('Ablex').",
    dominantColors: ["#1A1A1A", "#D4AF37", "#F3F4F6"],
    ambientColor: "rgba(212, 175, 55, 0.3)",
    aspectRatio: 1.0,
    tags: ["Musician Branding", "Identity", "Entertainment", "Visual System"]
  },
  {
    id: "mekinaye-automotive",
    title: "Mekinaye Automotive - Fusion of Engineering & Heritage",
    client: "Mekinaye Automotive",
    category: "Branding & Identity",
    year: "2026",
    coverImage: "/portfolio/branding/mekinaye_automotive.webp",
    featured: true,
    metrics: "Comprehensive Multi-Variant Logo System",
    description: "Automotive brand identity and emblem design uniting precision engineering with authentic Ethiopian cultural motifs and modern aerodynamics.",
    dominantColors: ["#1A4749", "#A74A0D", "#071114"],
    ambientColor: "rgba(26, 71, 73, 0.4)",
    aspectRatio: 1.79,
    tags: ["Automotive", "Engineering", "Emblem Design", "Brand Guidelines"]
  },
  {
    id: "ethiopias-next-top-model",
    title: "Ethiopia's Next Top Model Television Campaign",
    client: "Abbay TV High Fashion Showcase",
    category: "Poster & Key Art",
    year: "2026",
    coverImage: "/portfolio/posters/next_top_model.webp",
    featured: true,
    metrics: "Prime-Time Fashion Broadcast",
    description: "Editorial key art and advertising poster featuring Meti / Mariam Michael for the nationwide fashion competition series.",
    dominantColors: ["#AD3969", "#1E0515", "#FCE7F3"],
    ambientColor: "rgba(173, 57, 105, 0.4)",
    aspectRatio: 1.0,
    tags: ["Fashion", "Poster Design", "Key Art", "Broadcast Campaign"]
  },
  {
    id: "nur-life-coffee",
    title: "Nur Life 100% Premium Arabica Coffee",
    client: "Nur Life Specialty Coffee",
    category: "Packaging Design",
    year: "2026",
    coverImage: "/portfolio/packaging/nur_life_coffee.webp",
    featured: true,
    metrics: "Specialty Roast Packaging Line",
    description: "Rich artisanal coffee packaging for carefully selected beans from Ethiopian highland farms, celebrating pure origin and full-bodied aroma.",
    dominantColors: ["#14130F", "#C29B38", "#F4EDE4"],
    ambientColor: "rgba(194, 155, 56, 0.35)",
    aspectRatio: 0.75,
    tags: ["Specialty Coffee", "Packaging", "FMCG", "Product Design"]
  },
  {
    id: "maraki-weg-key-art",
    title: "Maraki Weg Celebrity Talk Show Key Art",
    client: "Abbay TV Entertainment",
    category: "Poster & Key Art",
    year: "2026",
    coverImage: "/portfolio/posters/maraki_weg_poster.webp",
    featured: true,
    metrics: "Prime-Time Wednesday 3:10 Broadcast",
    description: "Cinematic high-contrast key art portraiture and promotional poster for the intimate celebrity talk show uncovering behind-the-scenes life stories.",
    dominantColors: ["#FDEBC3", "#39352C", "#121110"],
    ambientColor: "rgba(253, 235, 195, 0.3)",
    aspectRatio: 1.0,
    tags: ["Celebrity", "Key Art", "Cinematic Portrait", "Television"]
  },
  {
    id: "etfc-muay-thai",
    title: "ETFC Muay Thai Championship - Arada Park",
    client: "ETFC Combat Sports / Shadow Event",
    category: "Poster & Key Art",
    year: "2026",
    coverImage: "/portfolio/posters/muay_thai_championship.webp",
    featured: true,
    metrics: "National Championship Bout · Ticket & Poster Collateral",
    description: "High-octane event poster and ticketing suite for Rebik Sani (Ethiopia) vs Shadow James Majok (South Sudan) at Arada Park.",
    dominantColors: ["#000000", "#E11D48", "#FFFFFF"],
    ambientColor: "rgba(225, 29, 72, 0.35)",
    aspectRatio: 1.5,
    tags: ["Combat Sports", "Event Poster", "Ticket Design", "Typography"]
  },
  {
    id: "elmi-construction",
    title: "Elmi Construction Corporate Visual Identity",
    client: "Elmi Construction",
    category: "Branding & Identity",
    year: "2025",
    coverImage: "/portfolio/branding/elmi_construction.webp",
    featured: false,
    description: "Monolithic architectural brand identity, structural grid variations, and Montserrat typographic system for civil engineering firm.",
    dominantColors: ["#0B4F7B", "#1F7DBB", "#FFFFFF"],
    ambientColor: "rgba(11, 79, 123, 0.4)",
    aspectRatio: 1.78,
    tags: ["Corporate Identity", "Construction", "Grid System", "Typography"]
  },
  {
    id: "chef-master-branding",
    title: "Chef Master Culinary Brand Identity & Pattern",
    client: "Chef Master Culinary Show",
    category: "Branding & Identity",
    year: "2025",
    coverImage: "/portfolio/branding/chef_master.webp",
    featured: false,
    description: "Vibrant culinary branding, custom repeating kitchenware geometric pattern, and multi-color identity suite (#0B6E2B, #E31919, #FFC400).",
    dominantColors: ["#0B6E2B", "#E31919", "#FFC400"],
    ambientColor: "rgba(11, 110, 43, 0.35)",
    aspectRatio: 1.78,
    tags: ["Culinary", "Pattern Design", "Packaging", "Brand Identity"]
  },
  {
    id: "barber-grooming",
    title: "Barber - Look Good • Feel Great Luxury Grooming",
    client: "Barber Premium Men's Grooming",
    category: "Packaging Design",
    year: "2026",
    coverImage: "/portfolio/packaging/barber_grooming.webp",
    featured: false,
    description: "Minimalist matte black grooming product packaging, foil accents, and urban apothecary visual branding.",
    dominantColors: ["#0B0B0C", "#131115", "#A3A3A3"],
    ambientColor: "rgba(140, 140, 160, 0.25)",
    aspectRatio: 1.5,
    tags: ["Grooming", "Luxury Packaging", "Dark Aesthetic", "Cosmetics"]
  },
  {
    id: "lulu-chibs",
    title: "Lulu Chibs Crispy Gourmet Snack Packaging",
    client: "Lulu Foods",
    category: "Packaging Design",
    year: "2026",
    coverImage: "/portfolio/packaging/lulu_chibs.webp",
    featured: false,
    description: "Playful, mouth-watering potato chips packaging design highlighting texture, crunch, and bold flavor personality.",
    dominantColors: ["#F0E8DB", "#D97706", "#92400E"],
    ambientColor: "rgba(217, 119, 6, 0.35)",
    aspectRatio: 0.8,
    tags: ["Snack", "Packaging", "FMCG", "Character"]
  },
  {
    id: "teddy-p-restaurant",
    title: "Teddy-P Cafe & Restaurant Menu & Collateral",
    client: "Teddy-P Hospitality Group",
    category: "Packaging Design",
    year: "2026",
    coverImage: "/portfolio/packaging/teddy_p_menu.webp",
    featured: false,
    description: "Warm, welcoming hospitality brand essence: 'Warmth. Taste. Togetherness.' with artisanal takeout packaging and menu architecture.",
    dominantColors: ["#F8F0E8", "#854D0E", "#1F2937"],
    ambientColor: "rgba(133, 77, 14, 0.3)",
    aspectRatio: 0.71,
    tags: ["Hospitality", "Menu Design", "Packaging", "Artisan"]
  },
  {
    id: "good-africa-milk",
    title: "Good Africa Enterprise Flavored Milk Cartons",
    client: "Good Africa Enterprise",
    category: "Packaging Design",
    year: "2026",
    coverImage: "/portfolio/packaging/good_africa_milk.webp",
    featured: false,
    description: "Flavored dairy carton series (Chocolate, Ginger Milk, Strawberry) engineered with vibrant shelf-appeal and bold typographic hierarchy.",
    dominantColors: ["#3888C9", "#1E3A8A", "#FFFFFF"],
    ambientColor: "rgba(56, 136, 201, 0.35)",
    aspectRatio: 0.71,
    tags: ["Beverage", "Dairy Packaging", "Illustration", "Retail"]
  },
  {
    id: "mesnqo-cultural",
    title: "Mesenqo Cultural Series Television Poster",
    client: "Abbay TV Cultural Programming",
    category: "Poster & Key Art",
    year: "2026",
    coverImage: "/portfolio/posters/mesnqo_poster.webp",
    featured: false,
    description: "Sunday afternoon musical heritage celebration honoring traditional Ethiopian harps (Mesenqo) and Azmari poetic troubadours.",
    dominantColors: ["#152F15", "#A16207", "#091B14"],
    ambientColor: "rgba(21, 47, 21, 0.45)",
    aspectRatio: 1.0,
    tags: ["Cultural Heritage", "Music", "Poster Design", "Tradition"]
  },
  {
    id: "medaliya-sports",
    title: "Medalia Sports Show Broadcast Poster",
    client: "Abbay TV Sports Division",
    category: "Poster & Key Art",
    year: "2026",
    coverImage: "/portfolio/posters/medaliya_sports.webp",
    featured: false,
    description: "Wednesday prime-time championship sports analysis key art featuring bold metallic typography and dynamic athletic motion silhouettes.",
    dominantColors: ["#353B62", "#500E11", "#413E5A"],
    ambientColor: "rgba(53, 59, 98, 0.4)",
    aspectRatio: 1.0,
    tags: ["Sports", "Poster Design", "Broadcast Art", "Motion"]
  },
  {
    id: "man-yikenes-poster",
    title: "Man Yikenes Prime-Time Quiz Show Poster",
    client: "Abbay TV Game Shows",
    category: "Poster & Key Art",
    year: "2026",
    coverImage: "/portfolio/posters/man_yikenes_poster.webp",
    featured: false,
    description: "High-stakes quiz show key art featuring dramatic tension, countdown dynamics, and 100,000 Birr grand prize spotlight.",
    dominantColors: ["#01449E", "#F1EEEB", "#0056BA"],
    ambientColor: "rgba(1, 68, 158, 0.4)",
    aspectRatio: 0.8,
    tags: ["Game Show", "Television Poster", "Quiz", "High Energy"]
  },
  {
    id: "roha-travel-dubai",
    title: "Roha Travel & Tourism - Dubai Campaign",
    client: "Roha Travel Agency",
    category: "Printing & Editorial",
    year: "2026",
    coverImage: "/portfolio/print/roha_travel_dubai.webp",
    featured: false,
    description: "Luxury travel brochure and advertising poster showcasing skyline architecture and exclusive getaway itineraries.",
    dominantColors: ["#FFE8C3", "#2D2F2F", "#EBEBEC"],
    ambientColor: "rgba(255, 232, 195, 0.35)",
    aspectRatio: 0.71,
    tags: ["Travel & Tourism", "Brochure", "Print Design", "Luxury"]
  },
  {
    id: "roha-travel-thailand",
    title: "Roha Travel - Thailand Tropical Journey",
    client: "Roha Travel Agency",
    category: "Printing & Editorial",
    year: "2026",
    coverImage: "/portfolio/print/roha_travel_thailand.webp",
    featured: false,
    description: "Vibrant editorial poster and travel collateral promoting exotic cultural and island travel packages.",
    dominantColors: ["#1B1917", "#D8E1EB", "#FAEEE3"],
    ambientColor: "rgba(27, 25, 23, 0.3)",
    aspectRatio: 0.71,
    tags: ["Travel & Tourism", "Editorial", "Poster", "Typography"]
  },
  {
    id: "muhany-chocolatier",
    title: "Muhany Luxury Patisserie & Dessert Menu",
    client: "Muhany Chocolatier & Cafe",
    category: "Printing & Editorial",
    year: "2026",
    coverImage: "/portfolio/print/muhany_menu.webp",
    featured: false,
    description: "High-end patisserie menu editorial featuring artisanal Belgian waffles, brownie sundaes, and gourmet confections.",
    dominantColors: ["#AA8F72", "#F0D8BF", "#2C1605"],
    ambientColor: "rgba(170, 143, 114, 0.35)",
    aspectRatio: 0.67,
    tags: ["Patisserie", "Editorial Menu", "Luxury Print", "Gastronomy"]
  },
  {
    id: "beauty-nail-studio",
    title: "Beauty Nail Studio Editorial Print",
    client: "Beauty Nail Studio Addis",
    category: "Printing & Editorial",
    year: "2025",
    coverImage: "/portfolio/print/beauty_nail_studio.webp",
    featured: false,
    description: "Cosmetic brand promotional print highlighting sunlight-infused aesthetics and self-expression.",
    dominantColors: ["#8E1115", "#BE123C", "#FFF1F2"],
    ambientColor: "rgba(142, 17, 21, 0.35)",
    aspectRatio: 0.71,
    tags: ["Cosmetics", "Editorial Print", "Beauty", "Advertising"]
  },
  {
    id: "muay-thai-vip-ticket",
    title: "Muay Thai Championship VIP Ticket Suite",
    client: "ETFC Combat Sports",
    category: "Printing & Editorial",
    year: "2026",
    coverImage: "/portfolio/print/muay_thai_ticket.webp",
    featured: false,
    description: "Security-embossed VIP event pass, admission ticket, and lanyard design for national championship bout at Arada Park.",
    dominantColors: ["#000000", "#DC2626", "#F3F4F6"],
    ambientColor: "rgba(220, 38, 38, 0.35)",
    aspectRatio: 2.36,
    tags: ["Event Pass", "Ticket Design", "Security Print", "Combat Sports"]
  },
  {
    id: "broadcast-thumbnail-sedo",
    title: "Jhonney vs Sedo Championship Thumbnail",
    client: "Abbay TV YouTube Broadcast",
    category: "Digital & Thumbnail Design",
    year: "2026",
    coverImage: "/portfolio/thumbnails/jhonney_vs_sedo.webp",
    featured: false,
    metrics: "High-CTR Broadcast Key Visual",
    description: "High-converting YouTube video packaging with dynamic expression cutouts and neon title typography.",
    dominantColors: ["#0B0E1E", "#3B82F6", "#FFFFFF"],
    ambientColor: "rgba(11, 14, 30, 0.4)",
    aspectRatio: 1.78,
    tags: ["Thumbnail Design", "YouTube", "Broadcast Packaging", "CTR Optimization"]
  },
  {
    id: "broadcast-thumbnail-man-yeqenes",
    title: "Man Yeqenesai Show Digital Key Visual",
    client: "Abbay TV Digital",
    category: "Digital & Thumbnail Design",
    year: "2026",
    coverImage: "/portfolio/thumbnails/man_yeqenesai.webp",
    featured: false,
    metrics: "National Viral Game Show",
    description: "Vibrant blue and gold YouTube thumbnail designed for high CTR across mobile recommendation feeds.",
    dominantColors: ["#002354", "#003F8D", "#FBBF24"],
    ambientColor: "rgba(0, 35, 84, 0.4)",
    aspectRatio: 1.78,
    tags: ["Digital Visual", "YouTube Packaging", "Game Show", "CTR Optimization"]
  },
  {
    id: "broadcast-thumbnail-mma",
    title: "Rebik vs South Sudan MMA Fight Thumbnail",
    client: "ETFC / Abbay Digital",
    category: "Digital & Thumbnail Design",
    year: "2026",
    coverImage: "/portfolio/thumbnails/rebik_vs_south_sudan.webp",
    featured: false,
    metrics: "Over 1.5M Digital Engagements",
    description: "Fierce dual-fighter split visual with national flag graphics and dramatic contrast lighting.",
    dominantColors: ["#080000", "#DC2626", "#F59E0B"],
    ambientColor: "rgba(220, 38, 38, 0.35)",
    aspectRatio: 1.78,
    tags: ["Combat Sports", "YouTube", "Viral Packaging", "Broadcast"]
  }
];

export const DESIGNER_INFO = {
  name: "Dani",
  fullName: "Daniel",
  title: "Lead Visual & Brand Identity Designer",
  subtitle: "Creative Director & Art Specialist",
  location: "Addis Ababa, Ethiopia",
  bio: "Senior brand and broadcast designer with extensive experience crafting high-impact visual identities, nationwide television branding, award-winning media packs, and packaging systems. Currently leading visual direction across broadcast and digital entertainment productions.",
  awards: [
    {
      title: "Broadcast Visual Direction Excellence",
      subtitle: "National Television Network Identity",
      role: "Lead Broadcast & Motion Designer"
    },
    {
      title: "Addis Music Awards Nominee 2025",
      subtitle: "Visual Identity & Creative Packaging",
      role: "Ablex - 'Keberaraye' (3M+ Digital Reach)"
    }
  ],
  stats: [
    { value: "36.7M+", label: "Digital Views Reached" },
    { value: "37 Pages", label: "Media Kit Architecture" },
    { value: "15+", label: "National Broadcast Show Identities" },
    { value: "7", label: "Design Disciplines Mastered" }
  ],
  services: [
    {
      title: "Corporate Media Packs & Decks",
      description: "High-end corporate profiles, 30+ spread media kits, broadcast sponsorship architectures, rate cards, and publication-grade presentation design.",
      tags: ["Media Kits", "Company Profiles", "Rate Cards", "Editorial Systems"]
    },
    {
      title: "Broadcast & Motion Branding",
      description: "Complete TV network identity suites, program packages, news graphics, title sequences, and 30-spread corporate media packs.",
      tags: ["Channel Identity", "Title Sequences", "Media Kits", "Show Packages"]
    },
    {
      title: "Brand Identity & Systems",
      description: "Comprehensive visual identity design, logo variations, typographic guidelines, and bespoke geometric pattern systems.",
      tags: ["Logo Systems", "Typography", "Color Science", "Brand Guidelines"]
    },
    {
      title: "Product Packaging Design",
      description: "Tactile retail packaging for FMCG, specialty Arabica coffee, luxury male grooming, and artisan food hospitality.",
      tags: ["Label Design", "Print Mockups", "Material Selection", "Shelf Impact"]
    },
    {
      title: "Key Art & Editorial Campaigns",
      description: "High-octane event posters, combat sports championships, high-fashion television campaigns, and luxury patisserie menus.",
      tags: ["Event Key Art", "Cinematic Posters", "Editorial Layouts", "VIP Passes"]
    },
    {
      title: "Digital & High-CTR Video Packaging",
      description: "Conversion-optimized YouTube thumbnails, digital key visuals, and social media campaigns engineered for multi-million engagement.",
      tags: ["YouTube Thumbnails", "Social Packaging", "CTR Optimization", "Viral Visuals"]
    }
  ],
  softwareExpertise: [
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Adobe InDesign",
    "Motion & After Effects",
    "CGI & 3D Visualization",
    "Print Production & Pre-Press"
  ],
  contact: {
    location: "Alfoz Plaza, 7th Floor, Imperial Gerji, Addis Ababa, Ethiopia",
    email: "Daziikroos61@gmail.com",
    phone: "+251967125822",
    phoneDisplay: "+251 967 12 5822",
    telegram: "@dazii8",
    telegramUrl: "https://t.me/dazii8",
    instagram: "@dazii8",
    instagramUrl: "https://www.instagram.com/dazii8/"
  }
};
