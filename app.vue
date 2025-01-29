<script setup lang="ts">
  const { loggedIn, user, session, fetch, clear } = useUserSession()




</script>

<template>
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
</template>
