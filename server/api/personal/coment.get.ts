import { useCurrentUser } from "~/composable/useCurrentUser"
import prisma from "~/lib/prisma"
import { authUser } from "~/shared/utils/abilities"





export default eventHandler(async() => {
    const { user } = useCurrentUser()
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