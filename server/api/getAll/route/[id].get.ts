import { ref } from "vue"
import prisma from "~/lib/prisma"
import { guest } from "~/shared/utils/abilities"



export default eventHandler(async(event) => {
    
    
    
    if (guest) {
        const id = +getRouterParam(event, 'id')!
        const route_public = await prisma.route.findMany({
            where:{
                is_private:false,
                approved:true,
                city:{
                    id:id
                }
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
 
        return route_public
    }
})  