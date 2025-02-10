import { useCurrentUser } from "~/composable/useCurrentUser"
import prisma from "~/lib/prisma"
import { authUser } from "~/shared/utils/abilities"

interface Body {
    name: string
    description: string
    lot: number
    lat: number
}

export default eventHandler(async(event) => {
    const { user } = useCurrentUser()
    if (authUser) {
        const {name, description, lot, lat} = await readBody<Body>(event)
        const id = +getRouterParam(event, 'id')!
        const rewriteRoutePlace =  await prisma.roultePlace.update({
            where:{
                id:+id,
                route:{
                    creater_id:user.yandexId
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
    }
})