import prisma from "~/lib/prisma";


export default eventHandler(async(event)=>{
    const {name, description,id,user_id,} = await readBody(event)
})