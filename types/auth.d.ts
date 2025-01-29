declare module '#auth-utils' {
    interface User {
        yandexId: number
        name:string
        is_admin:boolean
    }

    interface UserSession {
        foo: string
    }
    
    interface SecureSessionData {
        bar: number
    }
}
export {}