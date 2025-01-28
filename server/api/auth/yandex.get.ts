export default defineOAuthYandexEventHandler({
    config: {
        // emailRequired: true,
    },
    async onSuccess(event, { user, tokens }) {
        await setUserSession(event, {
            user: {
                yandexId: user.id,
                username: user.login,
                ...user,
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
