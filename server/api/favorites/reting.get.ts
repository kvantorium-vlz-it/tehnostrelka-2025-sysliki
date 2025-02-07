import { useCurrentUser } from "~/composable/useCurrentUser"
import prisma from "~/lib/prisma"
import { authUser } from "~/shared/utils/abilities"


export default eventHandler(async(event) => {
    if (authUser) {
        const route_id = +getRouterParam(event, 'route_id')!
        const { user } = useCurrentUser()
        
        const favorites = await prisma.favorites.findMany({
            where: {
                route_id: +route_id,
                user_id:user.yandexId
            }
        
        })

        return favorites
     }
})