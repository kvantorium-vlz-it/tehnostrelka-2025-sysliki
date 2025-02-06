import prisma from "~/lib/prisma"
import { user } from "~/use.vue"


interface Body{
    route_id: number
}
export default eventHandler(async(event) => {
    const {route_id} = await readBody<Body>(event)


    const id = await prisma.visited.findFirst({
        where:{
            route_id,
            user_id:user.yandexId
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