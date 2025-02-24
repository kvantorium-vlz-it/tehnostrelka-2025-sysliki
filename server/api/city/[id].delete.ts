import prisma from "~/lib/prisma"
import { adminUser, guest } from "~/shared/utils/abilities"

export default eventHandler(async(event) => {
    if (adminUser) {
        const id = +getRouterParam(event, 'id')!

        const city = await prisma.city.delete({
            where: {
                id
            },
            
   
        })
     }
})