
import { Visited } from "~/assets/ts/zod/visited"
import prisma from "~/lib/prisma"


export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)
    
    const {route_id} = await readBody<Visited>(event)
    const isVisited = await prisma.visited.findFirst({
        where:{
            route_id,
            user_id:+user.yandexId
        }
    })
    if (!isVisited) {
        const newVisited = await prisma.visited.create({
            data:{
                route_id,
                user_id:+user.yandexId,
            }
        })
    }

})