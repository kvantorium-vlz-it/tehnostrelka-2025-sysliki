
import { Moder } from "~/assets/ts/zod/moder"
import prisma from "~/lib/prisma"


export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)

        const {route_id} = await readBody<Moder>(event)


        const id = await prisma.moder.findFirst({
            where:{
                route_id,
                user_id:+user.yandexId
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
    
   

})