
// import { Route,  } from "~/assets/typescript/zod-schemas/route";
import { Route,routeSchema } from "~/assets/ts/zod/route";
import prisma from "~/lib/prisma";


export default eventHandler(async(event)=>{ 
  const { user } = await requireUserSession(event, {
    statusCode: 401,
    message: 'Вы не залогинены',
})

const body = await readBody<Route>(event)
const parseResult = routeSchema.safeParse(body)


if (!parseResult.success) {
    throw createError({
        status: 500,
        message: parseResult.error.message,
    })
}





const route = {
    ...parseResult.data,
    images: (await Promise.all(
        parseResult.data.images
            .filter((image) => image !== null)
            .map((image) => storeFileLocally(image, 8))
            
    )).map((src) => ({ src, alt: '' })),
    places: await Promise.all(parseResult.data.places.map(async (place) => ({
            ...place,
            images: (await Promise.all(place.images
                .filter((image) => image !== null)
                .map((image) => storeFileLocally(image, 8))
            )).map((src) => ({ src, alt: '' }))
        }))
    )
}

const { city_id, name, description, privateRoute,  places, images } = route

  const newRoute = await prisma.route.create({
    data: {   
      creater_id:+user.yandexId,
      name,
      description,
      is_private: privateRoute,
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

  if (!privateRoute) {
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


