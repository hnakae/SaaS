// pages/api/games.js

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const games = await prisma.game.findMany();
      res.status(200).json(games);
    } catch (error) {
      console.error("Error fetching games:", error);
      res.status(500).json({ error: "Error fetching games" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
