
import prisma from "~/lib/prisma";


interface Body {
    // creater_id: number
    name: string
    description: string
    privateRoute: boolean
    city_id: number
    places: {
      name: string
      description: string
      lot: number
      lat: number
      images: {
        src: string
        alt: string
      }[]
    }[]
    images:{
      src: string
      alt: string
    }[]
  }
  
export default eventHandler(async(event)=>{ 
  const { user } = await  requireUserSession(event)
  const {city_id, name, description, privateRoute,  places, images } = await readBody<Body>(event)

  const newRoute = await prisma.route.create({
    data: {   
      creater_id:+user.yandexId,
      name,
      description,
      is_private: privateRoute || false,
      city_id,

      roulte_place: {
        create: places.map((place) => ({
          lat: place.lat,
          lot: place.lot,
          description: place.description,
          name: place.name,

            route_place_image:{
              create: place.images.map((image) => ({
                image:{

                  create:{ 
                    src: image.src,
                    alt: image.alt,
                    }
                    
                }
              }))
            }
        }))
      },
            
            
      route_image: {
        create: images.map((image) => ({
          image: {
            create: {
              src: image.src,
              alt: image.alt,
            }
          }
        }))

      },
    },
  })

  if (privateRoute) {
    await prisma.moder.create({
      data:{
        route_id:newRoute.id,
        user_id:+user.yandexId
      }
    })
    
  }
  return newRoute

  
}
)


