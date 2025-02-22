import prisma  from "@/lib/prisma";
// import { user } from "~/use.vue";



  
export default defineOAuthYandexEventHandler({
    config: {
        // emailRequired: true,
    },
    
    async onSuccess(event, { user, tokens }) {
        const existeduser = await prisma.user.findUnique({
            where:{
                id:+user.id
            }
            
        })
      if (!existeduser) {
        await prisma.user.create({
            data:{
                id:+user.id,
                name:user.login,
                
            }
        })
        }
        await setUserSession(event, {
            user: {
                
                real_name: user.real_name,
                yandexId: user.id,
                username: user.login,
                
                is_admin: !! await prisma.userAdmin.findUnique({
                    where:{
                        user_id:+user.id
                    }
                })
            },
            loggedInAt: new Date()
        })


        

        // console.log('logged in')

        // console.log(user)
        // console.log(tokens)

        return sendRedirect(event, '/')
    },
    // Optional, will return a json error and 401 status code by default
    onError(event, error) {
        console.error('Yandex OAuth error:', error)
        return sendRedirect(event, '/')
    },
})
