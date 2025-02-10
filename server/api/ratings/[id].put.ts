import { useCurrentUser } from "~/composable/useCurrentUser"
import prisma from "~/lib/prisma"
import { authUser } from "~/shared/utils/abilities"

interface Body{
    value: number
    route_id: number
}

export default eventHandler(async(event) => {
    if (authUser){
        const {value,route_id} = await readBody<Body>(event)
        const { user } = useCurrentUser()
        const id = +getRouterParam(event, 'id')!
        const rewriteRating =  await prisma.rating.update({
            where:{
                id:+id,
                user_id:user.yandexId
            },
            data:{
                value,
            }
        })

        return rewriteRating
    }
})