import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    console.log(event);
    

    const { user } = await requireUserSession(event)

    return await prisma.route.findMany({
        where: {
            creater_id: +user.yandexId,
        },
    })
})
