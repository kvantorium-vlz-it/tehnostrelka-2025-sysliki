import { PrismaClient } from '@prisma/client';
import { useCurrentUser } from "~/composable/useCurrentUser";


const prisma = new PrismaClient().$extends({
  
  query: {
    route:{
      async update({ args, query }) {
        if (!args.data.private) {
          const oldRoute = await prisma.route.findUnique({
            where: { id: args.where.id },
            
          });
          const { user } = useCurrentUser()
          await prisma.moder.create({
            data:{
              route_id:oldRoute!.id,
              user_id:user.value!.yandexId
            }
          })
          
          return query(args)
        }
        const oldRoute = await prisma.route.findUnique({
          where: { id: args.where.id },
          
        });

        if (oldRoute) {
          const { user } = useCurrentUser()
          await prisma.auditLog.create({
            data: {
              table_name:'route',
              operation:'update',
              record_id:oldRoute.id,
              creater_id:user.value!.yandexId,
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
        
          if (!args.data.route?.connect?.private) {
            const oldRoute = await prisma.route.findUnique({
              where: { id: args.where.id },
              
            });
            const { user } = useCurrentUser()
            await prisma.moder.create({
              data:{
                route_id:oldRoute!.id,
                user_id:user.value!.yandexId
              }
            })
            
            return query(args)
          }
      
        const oldRoultePlace = await prisma.roultePlace.findUnique({
          where: { id: args.where.id },
          
        });

        if (oldRoultePlace) {
          const { user } = useCurrentUser()
          await prisma.auditLog.create({
            data: {
              table_name:'roultePlace',
              operation:'update',
              record_id:oldRoultePlace.id,
              creater_id:user.value!.yandexId,
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
      async update({ args, query }) {

        if (!args.data.route_image?.connect?.route?.private) {
          const oldRoute = await prisma.route.findUnique({
            where: { id: args.where.id },
            
          });
          const { user } = useCurrentUser()
          await prisma.moder.create({
            data:{
              route_id:oldRoute!.id,
              user_id:user.value!.yandexId
            }
          })
          
          return query(args)
        }
        if (!args.data.route_place_image?.connect?.route_place?.route?.private) {
          const oldRoute = await prisma.route.findUnique({
            where: { id: args.where.id },
            
          });
          const { user } = useCurrentUser()
          await prisma.moder.create({
            data:{
              route_id:oldRoute!.id,
              user_id:user.value!.yandexId
            }
          })
          
          return query(args)
        }
        
        const oldImage = await prisma.image.findUnique({
          where: { id: args.where.id },
          
        });

        if (oldImage) {
          const { user } = useCurrentUser()
          await prisma.auditLog.create({
            data: {
              table_name:'image',
              operation:'update',
              record_id:oldImage.id,
              creater_id:user.value!.yandexId,
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