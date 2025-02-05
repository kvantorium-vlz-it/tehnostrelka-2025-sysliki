import prisma from "~/lib/prisma";


export default eventHandler(async(event)=>{ 

        const { creater_id, name, descripsion, privateRoute, approved, places, route_images, route_place_images  } = await readBody(event)
    

        const newRoute = await prisma.route.create({
          data: {
            creater_id,
            name,
            descripsion,
            private: privateRoute || false,
            approved: approved || false,
            roulte_place: {
              create: places.map((place) => ({
                name: place.name,
                description: place.description,
                lat: place.lat,
                lot: place.lot,
                route_place_images:{
                    image: {
                        create:route_place_images.map((image) => ({
                            alt:image.alt,
                            src:image.src
                        }))
                    
                    }
                }, include: {
                    route_place_images: true
                }

              })),
             
            },
            route_image: {
                image: {
                    create: route_images.map((image) => ({
                        alt:image.alt,
                        src:image.src
                    }))
                }, 
                include: {
                    image: true
                }
            },
           
          },
          include: {
            roultePlace: true,
            route_image: true,
            
          },
        });
    });
    


