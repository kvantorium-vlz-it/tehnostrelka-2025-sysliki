
import prisma from '~/lib/prisma'
import { authsUser } from '~/shared/utils/abilities'


 export default  eventHandler(async(event) => {
    const {name, description, private, id} = await readBody(event)

    if (!(name || description || authsUser)) {
        return createError({
            statusCode: 400,
            statusMessage:'не хватает обязательных полей'
        })   
        
    }
    
    const route = await prisma.route.create({
            data: {
                name,
                descripsion,
                private,
                qpprowed:false,
                creater_id:id
            }
    })
    
    if (!private) {
        $fetch('/api/auth/approwed',{method:'POST',body:{
            creater_id:id,
            id:route.id

        }})
    }











})