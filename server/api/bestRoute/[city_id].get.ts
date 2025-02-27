import prisma from "~/lib/prisma"


export default eventHandler(async (event) => {
    const city_id = +getRouterParam(event, 'city_id')!

    // console.log(city_id);
    
    const routes = await prisma.route.findMany({
        where:{
            city:{
                id:city_id
            },
            is_private:false,
            approved:true
        },
        include:{
            _count:true,
        },
        orderBy:{
             visited: {
                _count: 'desc'
            }
        }
    })

    // console.log(routes[0].id);
    
    const rating =  await $fetch(`/api/ratings/${routes[0].id}`,{
        method:'GET',
    })


    return [routes[0], rating]

    


})