import { routes } from "vue-router/auto-routes";
import prisma from "~/lib/prisma";
import { user } from "~/use.vue";


interface Body {
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
    
    const {city, name, descripsion, privateRoute, approved, places, images } = await readBody<Body>(event)

        const newRoute = await prisma.route.create({
          data: {
            
            creater_id:user.yandexId,
            name,
            descripsion,
            private: privateRoute || false,
            approved: approved || false,

            roulte_place: {
              create: places.map((place) => ({
                lat: place.lat,
                lot: place.lot,
                description: place.descripsion,
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
            city: {
              create:{
                name:city
              }
            }
          },
        })
        return newRoute

        
  })


