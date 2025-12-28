import express from "express";

const router = express.Router();

export interface Employe {
  id: string;
  name: string;
  age: number;
  email: string;
  number: number;
  role: string;
}

export const employes: Employe[] = [
  {
    id: "1",
    name: "Anna Larsson",
    age: 32,
    email: "anna.larsson@ikea.com",
    number: 701234567,
    role: "Store Manager",
  },
  {
    id: "2",
    name: "Erik Johansson",
    age: 28,
    email: "erik.johansson@ikea.com",
    number: 702345678,
    role: "Sales Associate",
  },
  {
    id: "3",
    name: "Maria Svensson",
    age: 41,
    email: "maria.svensson@ikea.com",
    number: 703456789,
    role: "HR Specialist",
  },
  {
    id: "4",
    name: "Johan Andersson",
    age: 35,
    email: "johan.andersson@ikea.com",
    number: 704567890,
    role: "Logistics Coordinator",
  },
  {
    id: "5",
    name: "Sara Nilsson",
    age: 26,
    email: "sara.nilsson@ikea.com",
    number: 705678901,
    role: "Warehouse Worker",
  },
  {
    id: "6",
    name: "David Persson",
    age: 39,
    email: "david.persson@ikea.com",
    number: 706789012,
    role: "Supply Chain Manager",
  },
  {
    id: "7",
    name: "Elin Gustafsson",
    age: 24,
    email: "elin.gustafsson@ikea.com",
    number: 707890123,
    role: "Customer Service",
  },
  {
    id: "8",
    name: "Magnus Holm",
    age: 44,
    email: "magnus.holm@ikea.com",
    number: 708901234,
    role: "IT Support Technician",
  },
  {
    id: "9",
    name: "Linda Berg",
    age: 31,
    email: "linda.berg@ikea.com",
    number: 709012345,
    role: "Visual Merchandiser",
  },
  {
    id: "10",
    name: "Oskar Lindqvist",
    age: 29,
    email: "oskar.lindqvist@ikea.com",
    number: 701123456,
    role: "E-commerce Specialist",
  },
];

export function getEmployes() {
  return employes;
}

router.get("/", (req, res) => {
  return res.send(employes);
});

export default router;
