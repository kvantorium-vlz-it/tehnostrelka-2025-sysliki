
import { Rating } from "~/assets/ts/zod/rating"
import prisma from "~/lib/prisma"



export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)
    
    const {value,route_id} = await readBody<Rating>(event)
    const id = +getRouterParam(event, 'id')!
    const rewriteRating =  await prisma.rating.update({
        where:{
            id:+id,
            user_id:+user.yandexId
        },
        data:{
            value,
        }
    })

    return rewriteRating

})