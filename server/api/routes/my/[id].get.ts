import prisma from "~/lib/prisma"
import { guest } from "~/shared/utils/abilities"

export default eventHandler(async(event) => {
        const id = +getRouterParam(event, 'id')!

        const route = await prisma.route.findMany({
            where: {
                id: +id,
            },
            include:{
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
                },
                _count:true
            }
        
        })

        return route
})