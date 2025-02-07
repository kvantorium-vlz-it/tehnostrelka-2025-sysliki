import { useCurrentUser } from "~/composable/useCurrentUser"
import prisma from "~/lib/prisma"
import { authUser } from "~/shared/utils/abilities"
// import { user } from "~/use.vue"



export default eventHandler(async() => {
    const { user } = useCurrentUser()
    if (authUser) {
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
    }

})