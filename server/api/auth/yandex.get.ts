import prisma  from "@/lib/prisma";


  
export default defineOAuthYandexEventHandler({
    config: {
        // emailRequired: true,
    },
    
    async onSuccess(event, { user, tokens }) {
        await setUserSession(event, {
            user: {
                yandexId: user.id,
                username: user.login,
                is_admin: !! await prisma.userAdmin.findUnique({
                    where:{
                        id:+user.id
                    }
                })
            },
            loggedInAt: new Date()
        })

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
