import prisma from "~/lib/prisma"
import { adminUser } from "~/shared/utils/abilities"

export default eventHandler(async() => {
    if (adminUser) {
        const moder = await prisma.moder.findMany({
            include:{
                route:{
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
                }
            }
       }) 
       return moder
    }
   
})