import { PrismaClient } from '@prisma/client';
import { date } from 'zod';
// import { useCurrentUser } from "~/composable/useCurrentUser";
// let userContext: { userId?: number } = {};

// export const setUserContext = (userId: number) => {
//   userContext = { userId };
// };

// export const clearUserContext = () => {
//   userContext = {};
// };


const prisma = new PrismaClient().$extends({
  client: {
    withUser(user: any) {
      async  function moder(oldRoute:any) {
          const id = await prisma.moder.findMany({
            where:{
              route_id:oldRoute!.id,
              user_id:+user.yandexId
            },
            select:{
              id:true
            }
          })
          if (id) {
            await prisma.moder.deleteMany({
              where:{
                id:{ in: id.map((i) => i.id) }
              }
            })
            
          }
          
        }
      return prisma.$extends({
        query: {
         
          route:{
            
            async update({ args, query }) {
              
              
              
              
              
              if (!args.data.is_private) {

                const oldRoute = await prisma.route.findUnique({
                  where: { id: args.where.id },
                  
                });
                moder(oldRoute)

                await prisma.moder.create({
                  data:{
                    route_id:oldRoute!.id,
                    user_id:+user.yandexId
                  }
                })
                
                
              }else{
                const oldRoute = await prisma.route.findUnique({
                  where: { id: args.where.id },
                  
                });
                moder(oldRoute)
              }
              

              const oldRoute = await prisma.route.findUnique({
                where: { id: args.where.id },
                
              });
      
              if (oldRoute) {
                
                await prisma.auditLog.create({
                  data: {
                    table_name:'route',
                    operation:'update',
                    record_id:oldRoute.id,
                    creater_id:+user.yandexId,
                    old_data:oldRoute,
                    new_data:args.data
                    
                  },
                });
                await prisma.route.update({
                  where:{
                    id:oldRoute.id
                  },
                  data:{
                    approved:false,
                    updated_at:new Date().toString()
                  }
                })
              }
      
             
              
      
              return query(args);
            },
      
          },
          roultePlace:{
      
            async update({ args, query }) {
              
              const is_private = await prisma.route.findFirst({
                where:{
                  roulte_place:{
                    some:{
                      id: args.where.id 
                    }
                  }
                },
                select:{
                  is_private:true
                }
              })
              
              const oldRoute = await prisma.route.findFirst({
                where: { roulte_place:{some:{id:args.where.id}}  },
                
              });
              
              if (is_private && !is_private?.is_private && is_private?.is_private!=undefined) {
                  moder(oldRoute)
                  await prisma.moder.create({
                    data:{
                      route_id:oldRoute!.id,
                      user_id:+user.yandexId
                    }
                  })
                  
                  
                }else{
                  moder(oldRoute)
                }
            
              const oldRoultePlace = await prisma.roultePlace.findUnique({
                where: { id: args.where.id },
                include:{
                  route:{
                    select:{
                      id:true
                    }
                  }
                }
                
              });
      
              if (oldRoultePlace) {
                
                await prisma.auditLog.create({
                  data: {
                    table_name:'roultePlace',
                    operation:'update',
                    record_id:oldRoultePlace.id,
                    creater_id:+user.yandexId,
                    old_data:oldRoultePlace,
                    new_data:args.data
                    
                  },
                });
              }
      
             
                
                await prisma.route.update({
                  where:{
                    id:oldRoute?.id
                  },
                  data:{
                    approved:false,
                    updated_at:new Date().toString()

                  }
                })
              
      
              return query(args);
            }
          },
          image:{ 
            async update({ args, query,  }) {
              const is_private = await prisma.route.findFirst({
                where:{
                  OR:[{
                    route_image:{
                      some:{
                        image_id:args.where.id
                      }
                    },
                    roulte_place:{
                       some:{
                        route_place_image:{
                          some:{
                            image_id:args.where.id
                          }
                        }
                       }
                    }
                  }]
                }
              })
              const oldRoute = await prisma.image.findUnique({
                where: { id: args.where.id },
                include:{
                  route_image:{
                    include:{
                      route:{
                         select:{
                          id:true
                         }
                      }
                    }
                  },
                  route_place_image:{
                    include:{
                      route_place:{
                        include:{
                          route:{
                            select:{
                              id:true
                            }
                          }
                        }
                      }
                    }
                  }
                }
              });


              if (is_private && is_private.is_private!=undefined && !is_private.is_private) {
                
                moder(oldRoute)
                await prisma.moder.create({
                  data:{
                    route_id:oldRoute!.id,
                    user_id:+user.yandexId
                  }
                })
                
                
              }else{
                moder(oldRoute)
              }

              
              const oldImage = await prisma.image.findUnique({
                where: { id: args.where.id },
                
              });
      
              if (oldImage) {
                
                await prisma.auditLog.create({
                  data: {
                    table_name:'image',
                    operation:'update',
                    record_id:oldImage.id,
                    creater_id:+user.yandexId,
                    old_data:oldImage,
                    new_data:args.data
                    
                  },
                });
              }
              
                
                await prisma.route.update({
                  where:{
                    id:oldRoute?.id
                  },
                  data:{
                    approved:false,
                    updated_at:new Date().toString()
                  }
                })
              
      
              return query(args);
            }
          },
          
        
        },
        
      })
    }}

});


export default prisma;