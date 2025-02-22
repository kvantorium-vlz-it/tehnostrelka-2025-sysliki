
import { Visited } from "~/assets/ts/zod/visited"
import prisma from "~/lib/prisma"




export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)

    const {route_id} = await readBody<Visited>(event)


    const id = await prisma.visited.findFirst({
        where:{
            route_id,
            user_id:+user.yandexId
        },
        select:{
            id:true
        }
    })
    if (id) {
        await prisma.visited.delete({
            where:{
            id:+id.id
            }
        }) 
    }


})