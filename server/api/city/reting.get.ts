import prisma from "~/lib/prisma"
import { guest } from "~/shared/utils/abilities"

export default eventHandler(async(event) => {
    if (guest) {
        const route_id = +getRouterParam(event, 'route_id')!

        const city = await prisma.city.findMany({
            where: {
                route_id: +route_id
            }
        
        })

        return city
     }
})