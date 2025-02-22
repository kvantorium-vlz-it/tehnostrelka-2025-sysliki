<script setup lang="ts">
  import { authUser } from '@/shared/utils/abilities'



  const { loggedIn, user, session, fetch, clear } = useUserSession()
  
  

  const a = ref(true)
  
</script>

<template>
  <favoritesForm
    @mark-as-favorite="() => console.log('Избранное')"
    @remove-from-favorite="() => console.log('Не избранное')"
    @toggle-favorite="(isFav) => console.log('Переключение', isFav)"
    v-model="a"
  />
 
  <div v-if="loggedIn">
    <h1>Welcome {{ user?.real_name}}!</h1>
    <p>Logged in since {{ session.loggedInAt  }}    </p>
    <div>
          loggedIn: <pre>{{ JSON.stringify(loggedIn) }}</pre>
          user: <pre>{{ JSON.stringify(user, null, 2) }}</pre>
          <!-- session: <pre>{{ JSON.stringify(session, null, 2) }}</pre> -->
    </div>
    <button @click="clear">Logout</button>
    
  </div>
  <div v-else>
    <h1>Not logged in</h1>
      <NuxtLink external to="/api/auth/yandex">Yandex</NuxtLink>
    </div>
  
  <Can :ability="authUser">
    <createRouteForm/>
  </Can>
</template>