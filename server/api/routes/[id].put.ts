import { useCurrentUser } from "~/composable/useCurrentUser"
import prisma from "~/lib/prisma"
import { adminUser, authUser, guest } from "~/shared/utils/abilities"

interface Body {
    creater_id: number
    name: string
    description: string
    privateRoute: boolean
    approved: boolean
    places: [{
      name: string
      description: string
      lot: number
      lat: number
      images: {
        src: string
        alt: string
      }[]
    }]
    images:{
      src: string
      alt: string
    }[]
    city: string
  }

export default eventHandler(async(event) => {
    if (authUser) {
        const { user } = useCurrentUser()
        
        const {name, description, privateRoute} = await readBody<Body>(event)
        const id = +getRouterParam(event, 'id')!
        
        const rewriteRoute = await prisma.route.update({
            where:{
                id,
                creater_id:user.yandexId

            },  
            data: {
                name,
                description,
                private:privateRoute
                
            }
        })
        
        return rewriteRoute
    }
    if (adminUser) {
        const {name, description,approved,privateRoute } = await readBody<Body>(event)
        const id = +getRouterParam(event, 'id')!
        
        const rewriteRoute = await prisma.route.update({
            where:{
                id
            },  
            data: {
                name,
                description,
                approved,
                private:privateRoute
                
            }
        })
        return rewriteRoute

    }
})