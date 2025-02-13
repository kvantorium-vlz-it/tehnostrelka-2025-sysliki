
import prisma from "~/lib/prisma"



interface Body { 
    route_id: number 
    user_id: number
}


export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)

        const {route_id} = await readBody<Body>(event)

        const newFavorit = await prisma.favorites.create({
            data:{
                route_id,
                user_id:+user.yandexId
            }

        })
    

})