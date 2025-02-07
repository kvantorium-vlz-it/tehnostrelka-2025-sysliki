import { PrismaClient } from '@prisma/client';
import { useCurrentUser } from "~/composable/useCurrentUser";


const prisma = new PrismaClient().$extends({
  
  query: {
    route:{
      async update({ args, query }) {
        
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

        return query(args);
      }
    },
    roultePlace:{
      async update({ args, query }) {
        
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

        return query(args);
      }
    },
    image:{
      async update({ args, query }) {
        
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

        return query(args);
      }
    }

  },
});


export default prisma;