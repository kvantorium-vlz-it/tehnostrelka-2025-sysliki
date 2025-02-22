import { Place } from "~/assets/ts/zod/route"
import prisma from "~/lib/prisma"



export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)
    
        const {name, description, lot, lat} = await readBody<Place>(event)
        const id = +getRouterParam(event, 'id')!
        const rewriteRoutePlace =  await prisma.withUser(user).roultePlace.update({
            where:{
                id:+id,
                route:{
                    creater_id:+user.yandexId
                }
            },
            data:{
                name,
                description,
                lat,
                lot
            }
        })

       
        return rewriteRoutePlace
    
})