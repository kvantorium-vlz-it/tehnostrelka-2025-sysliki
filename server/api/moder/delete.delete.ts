import prisma from "~/lib/prisma"
import { authUser } from "~/shared/utils/abilities"
import { user } from "~/use.vue"

interface Body{
    route_id: number
}
export default eventHandler(async(event) => {
    if (authUser) {
        const {route_id} = await readBody<Body>(event)


        const id = await prisma.moder.findFirst({
            where:{
                route_id,
                user_id:user.yandexId
            },
            select:{
                id:true
            }
        })
        if (id) {
            await prisma.moder.delete({
                where:{
                    id:+id
                }
            }) 
        }
    }
   

})