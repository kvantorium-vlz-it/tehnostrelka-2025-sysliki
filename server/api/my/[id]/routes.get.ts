import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const user_id = +getRouterParams(event).id

    return await prisma.route.findMany({
      where: {
        creater_id: +user_id,
      },
      include: {
        _count: {
          select: {
            favorites: true,
            coments: true,
            visited: true,
          }
        },
        rating: {
          select: {
            value: true,
          }
        },
      },
    })
})
