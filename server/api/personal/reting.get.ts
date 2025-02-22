
import prisma from "~/lib/prisma"





export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)

         const reting = await prisma.rating.findMany({
            where:{
                user_id:+user.yandexId,

            },
            include:{
                route:{
                    select:{
                        id:true
                    }
                }
            }

        })
        return reting


})