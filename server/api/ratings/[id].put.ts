
import prisma from "~/lib/prisma"


interface Body{
    value: number
    route_id: number
}

export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)
    
    const {value,route_id} = await readBody<Body>(event)
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