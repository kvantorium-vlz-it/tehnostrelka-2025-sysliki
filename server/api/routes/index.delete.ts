

import { Route } from "~/assets/ts/zod/route";
import prisma from "~/lib/prisma";




  
export default eventHandler(async(event)=>{ 

  const { user } = await requireUserSession(event)

  const {route_id} = await readBody<Route>(event)

    
  const ids =  await prisma.route.findUnique({
    where:{
      id:+route_id!,
      creater_id:+user.yandexId,
    },
        
    
    select:{
      route_image:{select:{image:{select:{id:true}}}},
      roulte_place:{select:{route_place_image:{select:{image:true}}}}

    }
  })
  await prisma.image.deleteMany({
    where:{
      id:+[
        ...ids?.route_image.map((v) => v.image.id)!,
        ...ids?.roulte_place.map((v) => v.route_place_image.map((vv) => vv.image.id))!


      ]
    }
  })
  await prisma.route.delete({
    where:{
      id:+route_id!
    }
  }) 

})
