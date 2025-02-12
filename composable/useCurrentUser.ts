
export const useCurrentUser = () => {
  
  const { user, loggedIn, session } = useUserSession()
  
  return {
    user,
    loggedIn,
    session,
    userId: computed(() => user.value?.yandexId)
  }
}