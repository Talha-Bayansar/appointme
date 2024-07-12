import { requireAuthentication } from "@/features/auth/server-actions/auth";
import { prisma } from "@/lib/db";

export const getMyBusinessById = async (id: string) => {
  const user = await requireAuthentication();

  const business = await prisma.business.findFirst({
    where: {
      AND: [
        {
          id: id,
        },
        {
          ownerId: user.id,
        },
      ],
    },
  });

  if (!business) throw new Error("Couldn't find business");

  return business;
};
