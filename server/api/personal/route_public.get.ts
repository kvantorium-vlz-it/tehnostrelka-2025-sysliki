
import prisma from "~/lib/prisma"




export default defineEventHandler(async(event) => {
    const { user } = await requireUserSession(event)

    const route_public = await prisma.route.findMany({
        where:{
            is_private:false,
            creater_id: +user?.yandexId
        },
        include:{
            city:true,
            visited:true,
            rating:true,
            roulte_place:{
                include:{
                    route_place_image:{
                        include:{
                            image:true
                        }
                    }
                }
            },
            route_image:{
                include:{image:true}
            }
        }
    })
    return route_public
    
})