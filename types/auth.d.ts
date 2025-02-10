declare module '#auth-utils' {
    interface User {
        yandexId: number
        
        is_admin:boolean
        real_name:string
        username:string
    }

    // interface UserSession {
    //     foo: string
    // }
    
    // interface SecureSessionData {
    //     bar: number
    // }
}
export {}