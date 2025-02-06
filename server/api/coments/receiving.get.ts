import prisma from "~/lib/prisma"


    export default eventHandler(async (event) =>{
        const route_id = +getRouterParam(event, 'route_id')!
   
        const coments = await prisma.coments.findMany({
             where: {
                route_id: +route_id
             }
           
        })
   
        return coments
   
   })
