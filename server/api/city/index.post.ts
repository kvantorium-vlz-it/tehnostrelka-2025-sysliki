


import prisma from "~/lib/prisma"
import { adminUser, guest } from "~/shared/utils/abilities"

interface Body{
    name:string
}


export default eventHandler(async(event) => {
    if (adminUser) {
        const {name} = await readBody<Body>(event)

        const city = await prisma.city.create({
            data:{
                name
            }
        
        })

        return city
     }
})