import prisma from "~/lib/prisma"
import { adminUser } from "~/shared/utils/abilities"

export default eventHandler(async() => {
    if (adminUser) {
        const moder = await prisma.moder.findMany({
            include:{
                route:true
            }
       }) 
       return moder
    }
   
})