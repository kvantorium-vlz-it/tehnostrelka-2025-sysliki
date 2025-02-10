import { useCurrentUser } from "~/composable/useCurrentUser"
import prisma from "~/lib/prisma"
import { authUser } from "~/shared/utils/abilities"
// import { user } from "~/use.vue"

interface Body{
    route_id: number
}
export default eventHandler(async(event) => {
    const { user } = useCurrentUser()
    if (authUser){
        const {route_id} = await readBody<Body>(event)
        const isVisited = await prisma.visited.findFirst({
            where:{
                route_id,
                user_id:user.yandexId
            }
        })
        if (isVisited) {
            const newVisited = await prisma.visited.create({
                data:{
                    route_id,
                    user_id:user.yandexId,
                }
            })
        }
    }
})