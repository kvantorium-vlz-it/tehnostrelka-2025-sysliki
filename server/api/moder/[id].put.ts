// import { Route } from "~/assets/ts/interface/route"
import { Route } from "~/assets/ts/zod/route"
import prisma from "~/lib/prisma"
import { adminUser } from "~/shared/utils/abilities"

export default eventHandler(async(event) => {
    // console.log('a');
    
    // const  {user}  = await requireUserSession(event)
    
    
    if (adminUser) {
        const {approved } = await readBody<Route>(event)
        const id = +getRouterParam(event, 'id')!

 
    
    
    
        
        const rewriteRoute = await prisma.route.update({
            where:{
                id
            },  
            data: {
                
                approved,
                
            }
        })
        
        
        return rewriteRoute

        console.log();
        
    }
    

})