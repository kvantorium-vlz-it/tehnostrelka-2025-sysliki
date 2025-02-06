import prisma from "~/lib/prisma";
import { authUser } from "~/shared/utils/abilities";


import { user } from "~/use.vue";


interface Body{
    text: string
    route_id: number
}

export default eventHandler(async(event) =>{
    if (authUser) {

        const {text, route_id} = await readBody<Body>(event)

        const newComent = await prisma.coments.create({
            data:{
                text,
                route_id,
                user_id:user.yandexId

            }
        })

        return newComent
    }

})