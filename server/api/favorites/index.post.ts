import { useCurrentUser } from "~/composable/useCurrentUser"
import prisma from "~/lib/prisma"
import { authUser } from "~/shared/utils/abilities"


interface Body { 
    route_id: number 
    user_id: number
}


export default eventHandler(async(event) => {
    if (authUser) {
        const { user } = useCurrentUser()
        const {route_id} = await readBody<Body>(event)

        const newFavorit = await prisma.favorites.create({
            data:{
                route_id,
                user_id:user.yandexId
            }

        })
    }

})