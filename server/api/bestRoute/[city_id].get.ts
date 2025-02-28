import { ref } from "vue";
import prisma from "~/lib/prisma"


export default eventHandler(async (event) => {
    const city_id = +getRouterParam(event, 'city_id')!
    
    const routes = await prisma.route.findMany({
        where:{
            city:{
                id:+city_id
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
    const rating = ref()
    try {
        rating.value =  await $fetch(`/api/ratings/rat/${routes[0].id}`,{
            method:'GET',

        })
    } catch {
        rating.value = 0 
    }


    return [routes[0],rating.value]

    


})