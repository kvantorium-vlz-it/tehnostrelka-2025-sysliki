
import { Rating } from "~/assets/ts/zod/rating"
import prisma from "~/lib/prisma"




export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)
    
    const {value, route_id} = await readBody<Rating>(event)

    const newRating = await prisma.rating.create({
        data:{
            value,
            route_id,
            user_id: user.yandexId
        }
    })

})