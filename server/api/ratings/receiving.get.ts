import prisma from "~/lib/prisma"


    export default eventHandler(async (event) =>{
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
        return rating // null or undefine ????????
   
   })
