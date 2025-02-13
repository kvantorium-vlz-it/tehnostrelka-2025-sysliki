
import prisma from "~/lib/prisma"


interface Body{
    id: number
}

export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)

        const {id} = await readBody<Body>(event)
        await prisma.favorites.delete({
            where:{
                id,
                user_id:user.yandexId         
            }
        })
    
})