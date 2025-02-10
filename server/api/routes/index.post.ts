import { routes } from "vue-router/auto-routes";
import { useCurrentUser } from "~/composable/useCurrentUser";
import prisma from "~/lib/prisma";
import { authUser } from "~/shared/utils/abilities";
// import { user } from "~/use.vue";


interface Body {
    creater_id: number
    name: string
    description: string
    privateRoute: boolean
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
    city_id: number
  }
  
export default eventHandler(async(event)=>{ 
  const { user } = useCurrentUser()
  if (authUser) {
    const {city_id, name, description, privateRoute,  places, images } = await readBody<Body>(event)

    const newRoute = await prisma.route.create({
      data: {   
        creater_id:user.yandexId,
        name,
        description,
        private: privateRoute || false,
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
          user_id:user.yandexId
        }
      })
      
    }
    return newRoute

    
  }
})


