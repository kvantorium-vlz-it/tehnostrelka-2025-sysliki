
import { Coment } from "~/assets/ts/zod/coment";
import prisma from "~/lib/prisma";




export default eventHandler(async(event) =>{
    const { user } = await requireUserSession(event)


        const {text, route_id} = await readBody<Coment>(event)

        const newComent = await prisma.coments.create({
            data:{
                text,
                route_id: +route_id,
                user_id: +user.yandexId
            }
        })

        return newComent
    

})