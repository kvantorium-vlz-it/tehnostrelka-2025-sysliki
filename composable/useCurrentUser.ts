
export const useCurrentUser = () => {
  
  const { user, loggedIn, session } = getUserSession()
  
  return {
    user,
    loggedIn,
    session,
    userId: computed(() => user.value?.yandexId)
  }
}