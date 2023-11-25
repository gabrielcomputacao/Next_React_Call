import { prisma } from "./../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../auth/[...nextauth].api";
import { z } from "zod";

const udpdateProfileBodySchema = z.object({
  bio: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  if (!session) {
    return res.status(401).end();
  }

  const { bio } = udpdateProfileBodySchema.parse(req.body);

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio,
    },
  });

  /* 204 - sucesso porem uma um retorno sem dados */
  return res.status(204).end();
}
