
import prisma from "~/lib/prisma"






export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)

        const coments = await prisma.coments.findMany({
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
        return coments
    

})