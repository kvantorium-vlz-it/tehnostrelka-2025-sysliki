import { useCurrentUser } from "~/composable/useCurrentUser"
import prisma from "~/lib/prisma"
import { authUser } from "~/shared/utils/abilities"

interface Body {
    src: string
    alt: string
}

export default eventHandler(async(event) => {
    if ( authUser){ 
        const { user } = useCurrentUser()

        const {src,alt} = await readBody<Body>(event)
        const id = +getRouterParam(event, 'id')!
        const rewriteImage =  await prisma.image.update({
            where:{
                id:+id,
                route_image:{
                    route:{
                        creater_id:user.yandexId
                    }
                },
            // нужен ли or?

                route_place_image:{
                    route_place:{
                        route:{
                            creater_id:user.yandexId
                        }
                    }
                }
                
            },
            data:{
                alt,
                src
            }
        })

        return rewriteImage
    }
})