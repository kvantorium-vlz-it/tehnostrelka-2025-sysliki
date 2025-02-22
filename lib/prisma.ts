import { PrismaClient } from '@prisma/client';
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
      return prisma.$extends({
        query: {
         
          route:{
            
            async update({ args, query }) {
              
              
              
              
              
              if (!args.data.is_private) {
                const oldRoute = await prisma.route.findUnique({
                  where: { id: args.where.id },
                  
                });
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

                await prisma.moder.create({
                  data:{
                    route_id:oldRoute!.id,
                    user_id:+user.yandexId
                  }
                })
                
                
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
              }
      
              if (args.data.id) {
                await prisma.route.update({
                  where:{
                    id:+args.data.id
                  },
                  data:{
                    approved:false
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
              
              if (is_private && !is_private?.is_private && is_private?.is_private!=undefined) {
                  console.log(is_private);
                  const oldRoute = await prisma.route.findUnique({
                    where: { id: args.where.id },
                    
                  });
                  
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
                  await prisma.moder.create({
                    data:{
                      route_id:oldRoute!.id,
                      user_id:+user.yandexId
                    }
                  })
                  
                  
                }
            
              const oldRoultePlace = await prisma.roultePlace.findUnique({
                where: { id: args.where.id },
                
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
      
              if (args.data.route?.connect?.id) {
                
                await prisma.route.update({
                  where:{
                    id:+args.data.route?.connect?.id
                  },
                  data:{
                    approved:false
                  }
                })
              }
      
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
              if (is_private && is_private.is_private!=undefined && !is_private.is_private) {
                const oldRoute = await prisma.route.findUnique({
                  where: { id: args.where.id },
                  
                });
                
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
                await prisma.moder.create({
                  data:{
                    route_id:oldRoute!.id,
                    user_id:+user.yandexId
                  }
                })
                
                
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
              if (args.data.route_image?.connect?.route?.id) {
                
                await prisma.route.update({
                  where:{
                    id:+args.data.route_image?.connect?.route?.id
                  },
                  data:{
                    approved:false
                  }
                })
              }
      
              return query(args);
            }
          },
          
        
        },
        
      })
    }}

});


export default prisma;