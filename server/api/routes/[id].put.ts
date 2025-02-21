// import { useCurrentUser } from "~/composable/useCurrentUser"
import { Route } from "~/assets/ts/zod/route"
import prisma from "~/lib/prisma"
import { adminUser, authUser, guest } from "~/shared/utils/abilities"



export default eventHandler(async(event) => {
    
    const  {user}  = await requireUserSession(event)
    
    
    
    const {name, description, } = await readBody<Route>(event)
    let  {privateRoute} = await readBody<Route>(event)

    const id = +getRouterParam(event, 'id')!
    if (privateRoute === undefined) {
        const is_private = await prisma.route.findUnique({
                where:{
                    id
                },
                select:{
                    is_private:true
                }
            })
            if (is_private) {
                privateRoute = is_private?.is_private 
        
            }
            
    }
    




    const rewriteRoute = await prisma.withUser(user).route.update({
        where:{
            id,
            creater_id:+user.yandexId

        },  
        data: {
            name,
            description,
            is_private:privateRoute
            
        }
    })
    
    

    return rewriteRoute
})