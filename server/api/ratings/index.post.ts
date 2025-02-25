
import { ratingSchema, Rating } from "~/assets/ts/zod/rating"
import prisma from "~/lib/prisma"




export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)
    
    const body = await readBody<Rating>(event)

    const parseResult = ratingSchema.safeParse(body)

    if (!parseResult.success) {
        throw createError({

        })
    }

   const isRating = await prisma.rating.findFirst({
        where:{
            user_id: +user.yandexId
        }
    })

    if(!isRating){

        const {
            value,
            route_id,
        } = parseResult.data

        const newRating = await prisma.rating.create({
            data:{
                // value,
                // route_id,
                ...parseResult.data,
                user_id: +user.yandexId
            }
        })
    }

})