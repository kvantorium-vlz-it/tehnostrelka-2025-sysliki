import prisma from "~/lib/prisma"

interface Body {
    name: string
    description: string
    lot: number
    lat: number
}

export default eventHandler(async(event) => {
    const {name, description, lot, lat} = await readBody<Body>(event)
    const id = +getRouterParam(event, 'id')!
    const rewriteRoutePlace =  await prisma.roultePlace.update({
        where:{
            id:+id
        },
        data:{
            name,
            description,
            lat,
            lot
        }
    })

    return rewriteRoutePlace
})