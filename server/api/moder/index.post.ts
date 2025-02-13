
import prisma from "~/lib/prisma"


interface Body{
    route_id: number
}
export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)

        const {route_id} =  await readBody<Body>(event)

        const newModer = await prisma.moder.create({
            data:{
                user_id:+user.yandexId,
                route_id 
            }
        })
    
})