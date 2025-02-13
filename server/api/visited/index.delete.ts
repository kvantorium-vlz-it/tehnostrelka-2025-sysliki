
import prisma from "~/lib/prisma"
import { authUser } from "~/shared/utils/abilities"



interface Body{
    route_id: number
}
export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)

    const {route_id} = await readBody<Body>(event)


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
            id:+id
            }
        }) 
    }


})