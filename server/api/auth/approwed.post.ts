import prisma from '~/lib/prisma'
import { authsUser } from '~/shared/utils/abilities'


 export default  eventHandler(async(event) => {
    const {id, creater_id} =  await readBody(event)

    

 }


)