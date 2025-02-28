
import prisma from "~/lib/prisma"


interface Body{
    route_id: number
}

export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)

        const {route_id} = await readBody<Body>(event)

        const id = await prisma.favorites.findFirst({
            where:{
                route_id,
                user_id:+user.yandexId
            },
            include:{
                route:{
                    select:{
                        id:true
                    }
                }
            }
        })

        await prisma.favorites.deleteMany({
            where:{
                id:id?.id,
                user_id:+user.yandexId         
            }
        })
    
})