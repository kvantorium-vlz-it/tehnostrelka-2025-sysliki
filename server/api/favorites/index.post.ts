
import { Favorites } from "~/assets/ts/zod/favorites"
import prisma from "~/lib/prisma"






export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)

        const {route_id} = await readBody<Favorites>(event)

        const newFavorit = await prisma.favorites.create({
            data:{
                route_id,
                user_id:+user.yandexId
            }

        })
    

})