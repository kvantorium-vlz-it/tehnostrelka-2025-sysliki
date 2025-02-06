import prisma from "~/lib/prisma"
import { authUser } from "~/shared/utils/abilities"
import { user } from "~/use.vue"


export default eventHandler(async() => {
    if (authUser) {
        const route_privat = await prisma.route.findMany({
            where:{
                private:true,
                creater_id:user.yandexId
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
        return route_privat
    }
})