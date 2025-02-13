import { PrismaClient } from '@prisma/client';
// import { useCurrentUser } from "~/composable/useCurrentUser";
let userContext: { userId?: number } = {};

export const setUserContext = (userId: number) => {
  userContext = { userId };
};

export const clearUserContext = () => {
  userContext = {};
};


const prisma = new PrismaClient().$extends({
  
  query: {
   
  
    route:{
      async update({ args, query }) {
        if (!args.data.is_private) {
          const oldRoute = await prisma.route.findUnique({
            where: { id: args.where.id },
            
          });
          await prisma.moder.create({
            data:{
              route_id:oldRoute!.id,
              user_id:userContext.userId!
            }
          })
          
          return query(args)
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
              creater_id:userContext.userId!,
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
        
          if (!args.data.route?.connect?.is_private) {
            const oldRoute = await prisma.route.findUnique({
              where: { id: args.where.id },
              
            });
           
            await prisma.moder.create({
              data:{
                route_id:oldRoute!.id,
                user_id:userContext.userId!
              }
            })
            
            return query(args)
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
              creater_id:userContext.userId!,
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

        if (!args.data.route_image?.connect?.route?.is_private) {
          const oldRoute = await prisma.route.findUnique({
            where: { id: args.where.id },
            
          });
          // const { user } = useCurrentUser()
          await prisma.moder.create({
            data:{
              route_id:oldRoute!.id,
              user_id:userContext.userId!
            }
          })
          
          return query(args)
        }
        if (!args.data.route_place_image?.connect?.route_place?.route?.is_private) {
          const oldRoute = await prisma.route.findUnique({
            where: { id: args.where.id },
            
          });
          
          await prisma.moder.create({
            data:{
              route_id:oldRoute!.id,
              user_id:userContext.userId!
            }
          })
          
          return query(args)
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
              creater_id:userContext.userId!,
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

});


export default prisma;