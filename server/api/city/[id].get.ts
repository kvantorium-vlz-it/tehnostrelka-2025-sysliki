import prisma from "~/lib/prisma"
import { guest } from "~/shared/utils/abilities"

export default eventHandler(async(event) => {
    if (guest) {
        const id = +getRouterParam(event, 'id')!

        const city = await prisma.city.findMany({
            where: {
                id
            },
            include:{
                route:true
            }
        
        })

        return city
     }
})