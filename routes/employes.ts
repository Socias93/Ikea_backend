import express from "express";
import { validate } from "./schemas/Employes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

const EMPLOYE_API = "/";
const EMPLOYE_API_ID = "/:id";
const NOT_FOUND = "Employe not found";

export interface Employe {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: number;
  role: string;
}

export const employes: Employe[] = [
  {
    id: "1",
    name: "Anna Larsson",
    age: 32,
    email: "anna.larsson@ikea.com",
    phone: 701234567,
    role: "Store Manager",
  },
  {
    id: "2",
    name: "Erik Johansson",
    age: 28,
    email: "erik.johansson@ikea.com",
    phone: 702345678,
    role: "Sales Associate",
  },
  {
    id: "3",
    name: "Maria Svensson",
    age: 41,
    email: "maria.svensson@ikea.com",
    phone: 703456789,
    role: "HR Specialist",
  },
  {
    id: "4",
    name: "Johan Andersson",
    age: 35,
    email: "johan.andersson@ikea.com",
    phone: 704567890,
    role: "Logistics Coordinator",
  },
  {
    id: "5",
    name: "Sara Nilsson",
    age: 26,
    email: "sara.nilsson@ikea.com",
    phone: 705678901,
    role: "Warehouse Worker",
  },
  {
    id: "6",
    name: "David Persson",
    age: 39,
    email: "david.persson@ikea.com",
    phone: 706789012,
    role: "Supply Chain Manager",
  },
  {
    id: "7",
    name: "Elin Gustafsson",
    age: 24,
    email: "elin.gustafsson@ikea.com",
    phone: 707890123,
    role: "Customer Service",
  },
  {
    id: "8",
    name: "Magnus Holm",
    age: 44,
    email: "magnus.holm@ikea.com",
    phone: 708901234,
    role: "IT Support Technician",
  },
  {
    id: "9",
    name: "Linda Berg",
    age: 31,
    email: "linda.berg@ikea.com",
    phone: 709012345,
    role: "Visual Merchandiser",
  },
  {
    id: "10",
    name: "Oskar Lindqvist",
    age: 29,
    email: "oskar.lindqvist@ikea.com",
    phone: 701123456,
    role: "E-commerce Specialist",
  },
];

router.get(EMPLOYE_API, async (req, res) => {
  const employe = await prisma.employe.findMany();
  return res.send(employe);
});

router.get(EMPLOYE_API_ID, async (req, res) => {
  const employe = await prisma.employe.findFirst({
    where: { id: req.params.id },
  });
  if (!employe) return res.status(400).send(NOT_FOUND);

  return res.send(employe);
});

router.post(EMPLOYE_API, (req, res) => {
  const validation = validate(req.body);
  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const employe: Employe = {
    id: Date.now().toString(),
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role,
  };

  employes.push(employe);

  return res.send(employe);
});

router.put(EMPLOYE_API_ID, (req, res) => {
  const employe = employes.find((e) => e.id === req.params.id);
  if (!employe) return res.status(400).send(NOT_FOUND);

  const validation = validate(req.body);
  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  employe.name = req.body.name;
  employe.age = req.body.age;
  employe.email = req.body.email;
  employe.phone = req.body.phone;
  employe.role = req.body.role;

  return res.send(employe);
});

router.delete(EMPLOYE_API_ID, (req, res) => {
  const employe = employes.find((e) => e.id === req.params.id);
  if (!employe) return res.status(400).send(NOT_FOUND);

  const index = employes.indexOf(employe);
  const deletedEmploye = employes.splice(index, 1);

  return res.send(deletedEmploye);
});

export default router;
