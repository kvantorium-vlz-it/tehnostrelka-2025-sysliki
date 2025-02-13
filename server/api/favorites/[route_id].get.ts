
import prisma from "~/lib/prisma"



export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)

        const route_id = +getRouterParam(event, 'route_id')!
        
        const favorites = await prisma.favorites.findMany({
            where: {
                route_id: +route_id,
                user_id:+user.yandexId
            }
        
        })

        return favorites
     
})