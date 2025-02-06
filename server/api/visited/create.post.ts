import prisma from "~/lib/prisma"
import { user } from "~/use.vue"

interface Body{
    route_id: number
}
export default eventHandler(async(event) => {
    const {route_id} = await readBody<Body>(event)

    const newVisited = await prisma.visited.create({
        data:{
            route_id,
            user_id:user.yandexId,
        }
    })
})