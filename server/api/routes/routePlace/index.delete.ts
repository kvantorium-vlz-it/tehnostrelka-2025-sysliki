
import prisma from "~/lib/prisma"
import { authUser } from "~/shared/utils/abilities"

interface Body {
 id: number
}

export default eventHandler(async(event) => {
    if (authUser) {
        const { user } = await requireUserSession(event)
        const {id} = await readBody<Body>(event)
        await prisma.roultePlace.delete({
            where:{
                id,
                route:{
                    creater_id:+user.yandexId
                }
            }
        })
    }
        
})