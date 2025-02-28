import prisma from "~/lib/prisma"
import { guest } from "~/shared/utils/abilities";


    export default eventHandler(async (event) =>{
        if (guest) {


            const route_id = +getRouterParam(event, 'route_id')!

            const ratings = await prisma.rating.findMany({
                where: {
                    route_id: route_id
                },
                select:{
                    value:true
                },
                
            })
            
            return ratings.length > 0
                ?  ratings.reduce((acc, rating) => acc + rating.value, 0) / ratings.length
                : 0 
        }
   
   })
