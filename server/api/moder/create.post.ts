import prisma from "~/lib/prisma"
import { user } from "~/use.vue"

interface Body{
    route_id: number
}
export default eventHandler(async(event) => {
    const {route_id} =  await readBody<Body>(event)

    const newModer = await prisma.moder.create({
        data:{
            user_id:user.yandexId,
            route_id 
        }
    })
})