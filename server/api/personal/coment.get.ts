import prisma from "~/lib/prisma"
import { authUser } from "~/shared/utils/abilities"
import { user } from "~/use.vue"



export default eventHandler(async() => {
    if (authUser) {
        const coments = await prisma.coments.findMany({
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
        return coments
    }

})