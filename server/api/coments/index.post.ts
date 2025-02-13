
import prisma from "~/lib/prisma";



// import { user } from "~/use.vue";


interface Body{
    text: string
    route_id: number
}

export default eventHandler(async(event) =>{
    const { user } = await requireUserSession(event)


        const {text, route_id} = await readBody<Body>(event)

        const newComent = await prisma.coments.create({
            data:{
                text,
                route_id,
                user_id:user.yandexId

            }
        })

        return newComent
    

})