
import prisma from "~/lib/prisma"

interface Body{
    value: number
    route_id: number
}


export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)
    
    const {value, route_id} = await readBody<Body>(event)

    const newRating = await prisma.rating.create({
        data:{
            value,
            route_id,
            user_id: user.yandexId
        }
    })

})