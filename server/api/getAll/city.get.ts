import prisma from "~/lib/prisma"

export default eventHandler(async() =>{
    return await prisma.city.findMany()
})