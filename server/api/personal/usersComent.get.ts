import prisma from "~/lib/prisma"

export default eventHandler(async(event) =>{
    const { user } = await requireUserSession(event)
    
    
    const coments = await prisma.coments.findMany({
        where:{
            route:{
                creater_id:+user.yandexId
            },
            NOT:{
                user_id:+user.yandexId

            }
            
        }
    })


    return coments


})