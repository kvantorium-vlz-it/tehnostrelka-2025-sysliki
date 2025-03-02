// import type { User } from "@prisma/client"

import type { User } from "#auth-utils"


export const guest = defineAbility({ allowGuest: true }, (user: User | null) => true) //гостевой режим


export const authUser = defineAbility(() => true) 


// export const createrRoutes = defineAbility((user:User , post: Post) => {
//   return user.yandexId === post.authorId
// })


export const adminUser = defineAbility((user:User) => {
    return user.is_admin
})    

// нужна типизация

//

