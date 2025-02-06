import prisma from "~/lib/prisma"
import { user } from "~/use.vue"



export default eventHandler(async() => {
    const reting = await prisma.rating.findMany({
        where:{
            user_id:user.yandexId,

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