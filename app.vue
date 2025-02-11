<script setup lang="ts">
import { authUser } from './shared/utils/abilities'

  interface Route {
    route_name:string
    route_description:string
    is_privat:boolean
  }

  interface Place {
    name: string | null
    description: string | null
    images: File[]
    lat: number
    lot: number
  }

  const { loggedIn, user, session, fetch, clear } = useUserSession()
  const route =  reactive<Route>({
    route_name: '',
    is_privat: true,
    route_description: ''
  })

  let placeCount = ref(0) 
  const places = reactive<Place[]>([])


  // console.log(adasd);
  async function adasd () {
    return await allows(authUser)
  }
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

  <Can :ability="authUser">
  <div>
    <h1>создание маршрута</h1>
    <input v-model="route.route_name"   type="text"  placeholder="name">
    <hr>
    <input v-model="route.route_description" type="text" placeholder="description">
    <hr>
    is_private:<input v-model="route.is_privat" type="checkbox" >
    <hr>
    
    <button @click="() => {
      placeCount++
      places.push({ name: null, description: null, images: [], lat: 0, lot: 0 })
      }">добавить точку</button>
    <hr>
    <hr>
    <div v-for="i in placeCount">
        routePLace:{{ i }}
        <div>
          <hr>
          <hr>
          <input type="text" placeholder="name" v-model="places[i - 1].name">
          <hr>
          <input type="text" placeholder="description" v-model="places[i - 1].description"> 
          <hr>
          <input type="number" placeholder="lat" v-model="places[i - 1].lat">
          <hr>
          <input type="number" placeholder="lot" v-model="places[i - 1].lot">
          <hr>
          <hr>
        </div>


    </div>

    {{ places }}
  </div>
  </Can>
</template>
