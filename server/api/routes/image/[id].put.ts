import prisma from "~/lib/prisma"

interface Body {
    src: string
    alt: string
}

export default eventHandler(async(event) => {
    const {src,alt} = await readBody<Body>(event)
    const id = +getRouterParam(event, 'id')!
    const rewriteImage =  await prisma.image.update({
        where:{
            id:+id
        },
        data:{
            alt,
            src
        }
    })

    return rewriteImage
})