import prisma from "~/lib/prisma"
import { guest } from "~/shared/utils/abilities"

export default eventHandler(async() => {
    if (guest) {
        

        const route = await prisma.route.findMany({
            where: {
                is_private:false,
                approved:true,

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
                }
            }
        
        })

        return route
     }
})