
import prisma from "~/lib/prisma"
import { authUser } from "~/shared/utils/abilities"

interface Body {
    src: string
    alt: string
}

export default eventHandler(async(event) => {
    
        const { user } = await requireUserSession(event)
        // setUserContext(+user.yandexId)

        const {src,alt} = await readBody<Body>(event)
        const id = +getRouterParam(event, 'id')!
        const rewriteImage =  await prisma.withUser(user).image.update({
            where:{
                id:+id,

         OR:[   
                {    
                    route_image:{
                        route:{
                            creater_id:+user.yandexId
                        }
                    },
                },
                
                {   
                    route_place_image:{
                        route_place:{
                            route:{
                                creater_id:+user.yandexId
                            }
                        }
                    }
                }
            ]
                
            },
            data:{
                alt,
                src
            }
        })
        // clearUserContext()
        return rewriteImage
    
})