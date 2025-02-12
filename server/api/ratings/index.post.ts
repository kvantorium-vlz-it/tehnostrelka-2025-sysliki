

import { useCurrentUser } from "~/composable/useCurrentUser";
import prisma from "~/lib/prisma"
import { authUser } from "~/shared/utils/abilities";

// import { user } from "~/use.vue";

interface Body{
    value: number
    route_id: number
}


export default eventHandler(async(event) => {
    const { user } = useCurrentUser()
    if (authUser) {
        const {value, route_id} = await readBody<Body>(event)

        const newRating = await prisma.rating.create({
            data:{
                value,
                route_id,
                user_id: user.yandexId
            }
        })
    }
})