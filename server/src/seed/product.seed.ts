import { Types } from "mongoose";

const userId = new Types.ObjectId("69772ed108a5c5d4d4d83e58");

export const products = [
  // ================= T-SHIRTS =================
  {
    name: "Classic White T-Shirt",
    description:
      "Made from breathable cotton with a soft feel, this classic white t-shirt is perfect for everyday wear. Easy to style on its own or layer under jackets.",
    price: 29.9,
    instock_count: 120,
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Cream", hex: "#FFFBF0" },
      { name: "Off-White", hex: "#F5F5F0" },
    ],
    images: [
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769782890/fashApp/avatar/sliiwqda9fks4lgukivn.png",
        public_id: "fashApp/products/tshirt_white_01",
      },
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769782916/fashApp/avatar/ati691hzinvgp2aid6rc.png",
        public_id: "fashApp/products/tshirt_white_02",
      },
    ],
    is_newArrival: true,
    is_feature: true,
    rating_count: 45,
    userId,
  },
  {
    name: "Green Polo T-Shirt",
    description:
      "A clean and smart polo t-shirt made with comfortable fabric and a structured collar. Great for casual outings or semi-formal looks.",
    price: 49.9,
    instock_count: 90,
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Emerald", hex: "#15803D" },
      { name: "Forest Green", hex: "#166534" },
      { name: "Mint", hex: "#4ADE80" },
    ],
    images: [
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769782890/fashApp/avatar/sliiwqda9fks4lgukivn.png",
        public_id: "fashApp/products/polo_green_01",
      },
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769782916/fashApp/avatar/ati691hzinvgp2aid6rc.png",
        public_id: "fashApp/products/polo_green_02",
      },
    ],
    is_newArrival: false,
    is_feature: false,
    rating_count: 37,
    userId,
  },
  {
    name: "Black Graphic T-Shirt",
    description:
      "Features a modern graphic design on premium fabric. Comfortable fit with a bold look that works well for daily street style.",
    price: 39.9,
    instock_count: 70,
    category: "T-Shirts",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Charcoal", hex: "#1F2937" },
      { name: "Slate", hex: "#475569" },
    ],
    images: [
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769782890/fashApp/avatar/sliiwqda9fks4lgukivn.png",
        public_id: "fashApp/products/graphic_black_01",
      },
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769782916/fashApp/avatar/ati691hzinvgp2aid6rc.png",
        public_id: "fashApp/products/graphic_black_02",
      },
    ],
    is_newArrival: true,
    is_feature: false,
    rating_count: 28,
    userId,
  },

  // ================= HOODIES =================
  {
    name: "Black Oversized Hoodie",
    description:
      "Designed with an oversized fit for extra comfort and warmth. Soft on the inside and perfect for relaxed, everyday wear.",
    price: 79.9,
    instock_count: 60,
    category: "Hoodies",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Jet", hex: "#0A0E27" },
      { name: "Raven", hex: "#1A1A2E" },
    ],
    images: [
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769782971/fashApp/avatar/ihbumpmm3p8qzcx9y0db.png",
        public_id: "fashApp/products/hoodie_black_01",
      },
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769782990/fashApp/avatar/ccnoars2ji1optpccpnb.png",
        public_id: "fashApp/products/hoodie_black_02",
      },
    ],
    is_newArrival: true,
    is_feature: false,
    rating_count: 32,
    userId,
  },
  {
    name: "Grey Zip Hoodie",
    description:
      "A versatile zip-up hoodie made for comfort and convenience. Easy to layer and ideal for cool weather or casual days out.",
    price: 69.9,
    instock_count: 50,
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Ash", hex: "#9CA3AF" },
      { name: "Smoke", hex: "#6B7280" },
    ],
    images: [
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769782971/fashApp/avatar/ihbumpmm3p8qzcx9y0db.png",
        public_id: "fashApp/products/hoodie_grey_01",
      },
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769782990/fashApp/avatar/ccnoars2ji1optpccpnb.png",
        public_id: "fashApp/products/hoodie_grey_02",
      },
    ],
    is_newArrival: false,
    is_feature: true,
    rating_count: 21,
    userId,
  },
  {
    name: "Navy Pullover Hoodie",
    description:
      "Classic pullover hoodie in a deep navy tone. Comfortable fit with a cozy feel, great for daily wear and light outdoor use.",
    price: 74.9,
    instock_count: 45,
    category: "Hoodies",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Navy", hex: "#1E3A8A" },
      { name: "Cobalt", hex: "#0047AB" },
      { name: "Ocean", hex: "#0369A1" },
    ],
    images: [
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769782971/fashApp/avatar/ihbumpmm3p8qzcx9y0db.png",
        public_id: "fashApp/products/hoodie_navy_01",
      },
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769782990/fashApp/avatar/ccnoars2ji1optpccpnb.png",
        public_id: "fashApp/products/hoodie_navy_02",
      },
    ],
    is_newArrival: false,
    is_feature: false,
    rating_count: 19,
    userId,
  },

  // ================= PANTS =================
  {
    name: "Grey Sweatpants",
    description:
      "Comfort-focused sweatpants made with soft fabric and a relaxed fit. Ideal for lounging, workouts, or casual everyday wear.",
    price: 59.9,
    instock_count: 80,
    category: "Pants",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Heather", hex: "#D1D5DB" },
      { name: "Stone", hex: "#9CA3AF" },
      { name: "Graphite", hex: "#4B5563" },
    ],
    images: [
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769783011/fashApp/avatar/fviiflju8gkhkovhwism.png",
        public_id: "fashApp/products/sweatpants_grey_01",
      },
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769783025/fashApp/avatar/wcj6t1pdcn6jqoiewrk7.png",
        public_id: "fashApp/products/sweatpants_grey_02",
      },
    ],
    is_newArrival: false,
    is_feature: false,
    rating_count: 18,
    userId,
  },
  {
    name: "Beige Chino Pants",
    description:
      "Slim-fit chinos with a clean and modern look. Made for comfort while keeping a polished style for work or casual outings.",
    price: 89.9,
    instock_count: 50,
    category: "Pants",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Khaki", hex: "#D6CFC7" },
      { name: "Sand", hex: "#E7E5E4" },
      { name: "Tan", hex: "#C9A876" },
    ],
    images: [
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769783011/fashApp/avatar/fviiflju8gkhkovhwism.png",
        public_id: "fashApp/products/chino_beige_01",
      },
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769783025/fashApp/avatar/wcj6t1pdcn6jqoiewrk7.png",
        public_id: "fashApp/products/chino_beige_02",
      },
    ],
    is_newArrival: false,
    is_feature: true,
    rating_count: 26,
    userId,
  },
  {
    name: "Black Formal Pants",
    description:
      "Tailored formal pants with a classic cut. Designed for a clean and professional appearance, perfect for office or events.",
    price: 99.9,
    instock_count: 35,
    category: "Pants",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Midnight", hex: "#0F0F0F" },
      { name: "Ebony", hex: "#14213D" },
    ],
    images: [
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769783011/fashApp/avatar/fviiflju8gkhkovhwism.png",
        public_id: "fashApp/products/formal_black_01",
      },
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769783025/fashApp/avatar/wcj6t1pdcn6jqoiewrk7.png",
        public_id: "fashApp/products/formal_black_02",
      },
    ],
    is_newArrival: false,
    is_feature: true,
    rating_count: 17,
    userId,
  },

  // ================= JACKETS =================
  {
    name: "Blue Denim Jacket",
    description:
      "Timeless denim jacket with a structured fit. Durable fabric and classic styling that works across seasons.",
    price: 149.9,
    instock_count: 40,
    category: "Jackets",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Indigo", hex: "#4B0082" },
      { name: "Denim", hex: "#1E3A8A" },
      { name: "Azure", hex: "#007FFF" },
    ],
    images: [
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769783053/fashApp/avatar/ikcqzzyri3hy927dg5bt.png",
        public_id: "fashApp/products/denim_blue_01",
      },
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769782916/fashApp/avatar/ati691hzinvgp2aid6rc.png",
        public_id: "fashApp/products/denim_blue_02",
      },
    ],
    is_newArrival: false,
    is_feature: true,
    rating_count: 21,
    userId,
  },
  {
    name: "Brown Leather Jacket",
    description:
      "Premium leather jacket with a sleek finish. Designed to offer both warmth and a bold, stylish look.",
    price: 299.9,
    instock_count: 15,
    category: "Jackets",
    sizes: ["M", "L"],
    colors: [
      { name: "Espresso", hex: "#704214" },
      { name: "Caramel", hex: "#A67C52" },
      { name: "Cognac", hex: "#B8511A" },
    ],
    images: [
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769783053/fashApp/avatar/ikcqzzyri3hy927dg5bt.png",
        public_id: "fashApp/products/leather_brown_01",
      },
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769782916/fashApp/avatar/ati691hzinvgp2aid6rc.png",
        public_id: "fashApp/products/leather_brown_02",
      },
    ],
    is_newArrival: true,
    is_feature: true,
    rating_count: 9,
    userId,
  },
  {
    name: "Black Windbreaker Jacket",
    description:
      "Lightweight windbreaker designed to block wind and light rain. Easy to wear, pack, and style for everyday use.",
    price: 119.9,
    instock_count: 30,
    category: "Jackets",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Onyx", hex: "#353839" },
    ],
    images: [
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769783053/fashApp/avatar/ikcqzzyri3hy927dg5bt.png",
        public_id: "fashApp/products/windbreaker_black_01",
      },
      {
        image_url:
          "https://res.cloudinary.com/dy5fq6uc7/image/upload/v1769782916/fashApp/avatar/ati691hzinvgp2aid6rc.png",
        public_id: "fashApp/products/windbreaker_black_02",
      },
    ],
    is_newArrival: true,
    is_feature: false,
    rating_count: 13,
    userId,
  },
];
