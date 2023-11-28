import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  /* query nesse caso retorna tambem os parametros passados pela rota e tambem os parametros passados por interrogação */

  const username = String(req.query.username);
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date not provided." });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "User does not exist." });
  }

  const referenceDate = dayjs(String(date));
  const isPastDate = referenceDate.endOf("day").isBefore(new Date());

  if (isPastDate) {
    return res.json({ possibleTimes: [], availableTimes: [] });
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get("day"),
    },
  });

  if (!userAvailability) {
    return res.json({ possibleTimes: [], availableTimes: [] });
  }

  const { time_end_in_minutes, time_start_in_minutes } = userAvailability;

  const startHour = time_start_in_minutes / 60;
  const endHour = time_end_in_minutes / 60;

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, index) => {
      return startHour + index;
    }
  );

  // gte = greater than or equal = maior que ou igual

  const blockedTImes = await prisma.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set("hour", startHour).toDate(),
        lte: referenceDate.set("hour", endHour).toDate(),
      },
    },
  });

  const availableTimes = possibleTimes.filter((time) => {
    return !blockedTImes.some(
      (blockedtime) => blockedtime.date.getHours() === time
    );
  });

  return res.json({ possibleTimes, availableTimes });
}
