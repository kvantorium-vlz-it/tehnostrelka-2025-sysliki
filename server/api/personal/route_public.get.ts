import { useCurrentUser } from "~/composable/useCurrentUser"
import prisma from "~/lib/prisma"
import { authUser } from "~/shared/utils/abilities"
// import { user } from "~/use.vue"


export default eventHandler(async() => {
    const { user } = useCurrentUser()
    if (authUser) {
        const route_public = await prisma.route.findMany({
            where:{
                private:false,
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
        return route_public
    }
})