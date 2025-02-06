import { routes } from "vue-router/auto-routes";
import prisma from "~/lib/prisma";
import { authUser } from "~/shared/utils/abilities";
import { user } from "~/use.vue";


interface Body {
    route_id: number
    creater_id: number
    name: string
    descripsion: string
    privateRoute: boolean
    approved: boolean
    places: [{
      name: string
      descripsion: string
      lot: number
      lat: number
      images: {
        src: string
        alt: string
      }[]
    }]
    images:{
      src: string
      alt: string
    }[]
    city: string
  }
  
  export default eventHandler(async(event)=>{ 
    if (authUser){
        const {route_id} = await readBody<Body>(event)

        
        const ids =  await prisma.route.findMany({
            where:{
                id:+route_id,
             },
                
            
            select:{
                route_image:{select:{image:{select:{id:true}}}},
                roulte_place:{select:{route_place_image:{select:{image:true}}}}

            }
        })
        await prisma.image.deleteMany({
            where:{
                id:+ids
            }
        })
        await prisma.route.delete({
            where:{
                id:+route_id
            }
        }) 
    }


  })
