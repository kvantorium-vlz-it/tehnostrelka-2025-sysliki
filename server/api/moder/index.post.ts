
import { Moder } from "~/assets/ts/zod/moder"
import prisma from "~/lib/prisma"



export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)

        const {route_id} =  await readBody<Moder>(event)

        const newModer = await prisma.moder.create({
            data:{
                user_id:+user.yandexId,
                route_id 
            }
        })
    
})