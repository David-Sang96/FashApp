import type { Order } from "@/store/types/order";

export const FAKE_ORDER: Order[] = [
  {
    _id: "123",
    userId: "r34",
    items: [
      {
        productId: "1234",
        name: "Jacket",
        image: "/client/public/hero-product.jpg",
        price: 100,
        quantity: 2,
      },
    ],
    bill: 200,
    createdAt: "2026-02-20T10:15:00Z",
    updatedAt: "2026-02-20T10:15:00Z",
    status: "paid",
    customer: "David Sang",
  },
  {
    _id: "124",
    userId: "r35",
    items: [
      {
        productId: "1234",
        name: "Jacket",
        image: "/client/public/hero-product.jpg",
        price: 100,
        quantity: 1,
      },
    ],
    bill: 100,
    createdAt: "2026-02-21T14:30:00Z",
    updatedAt: "2026-02-21T14:30:00Z",
    status: "pending",
    customer: "Alice Tan",
  },
  {
    _id: "125",
    userId: "r36",
    items: [
      {
        productId: "1234",
        name: "Jacket",
        image: "/client/public/hero-product.jpg",
        price: 100,
        quantity: 3,
      },
    ],
    bill: 300,
    createdAt: "2026-02-22T09:00:00Z",
    updatedAt: "2026-02-22T09:00:00Z",
    status: "shipped",
    customer: "Michael Lee",
  },
  {
    _id: "126",
    userId: "r37",
    items: [
      {
        productId: "1234",
        name: "Jacket",
        image: "/client/public/hero-product.jpg",
        price: 100,
        quantity: 4,
      },
    ],
    bill: 400,
    createdAt: "2026-02-23T16:45:00Z",
    updatedAt: "2026-02-23T16:45:00Z",
    status: "delivered",
    customer: "Sophia Lim",
  },
  {
    _id: "127",
    userId: "r38",
    items: [
      {
        productId: "1234",
        name: "Jacket",
        image: "/client/public/hero-product.jpg",
        price: 100,
        quantity: 1,
      },
    ],
    bill: 100,
    createdAt: "2026-02-24T11:20:00Z",
    updatedAt: "2026-02-24T11:20:00Z",
    status: "cancelled",
    customer: "Daniel Wong",
  },
  {
    _id: "128",
    userId: "r39",
    items: [
      {
        productId: "1234",
        name: "Jacket",
        image: "/client/public/hero-product.jpg",
        price: 100,
        quantity: 5,
      },
    ],
    bill: 500,
    createdAt: "2026-02-25T08:10:00Z",
    updatedAt: "2026-02-25T08:10:00Z",
    status: "paid",
    customer: "Emma Tan",
  },
];
