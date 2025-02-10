import prisma from "~/lib/prisma"
import { guest } from "~/shared/utils/abilities";


    export default eventHandler(async (event) =>{
        if (guest) {
            const route_id = +getRouterParam(event, 'route_id')!
    
            const ratings = await prisma.rating.findMany({
                where: {
                    route_id: +route_id
                },
                select:{
                    value:true
                },
                
            })
            
            const ratings_value = ratings.reduce((acc, rating) => acc + rating.value, 0);
            const value =  ratings.length
            const rating = ratings_value/value
            if (rating === null || rating === undefined ) {
            return 0
            }
            return rating // null or undefine ????????
        }
   
   })
