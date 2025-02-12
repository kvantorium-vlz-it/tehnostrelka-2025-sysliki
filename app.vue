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
    images:{
      src: string | null
      alt: string | null
    }[]
    lat: number
    lot: number
    count: number
  }
  interface Images{
      src: string | null
      alt: string | null
    }

  const { loggedIn, user, session, fetch, clear } = useUserSession()
  
  const route =  reactive<Route>({
    route_name: '',
    is_privat: true,
    route_description: ''
  })

  let placeCount = ref(0) 
  let imageCount = ref(0) 

  
  const places = reactive<Place[]>([])
  const images = reactive<Images[]>([])
  interface Body {
    name: string
    description: string
    privateRoute: boolean
    city_id: number
    places: {
      name: string
      description: string
      lot: number
      lat: number
      images: {
        src: string
        alt: string
      }[]
    }[]
    images:{
      src: string
      alt: string
    }[]
  }
  

  async  function createRoute<Body>( name, description, isPrivat, city_id, places, images ) {
    await $fetch('/api/routes',{
      method:'POST',
      body: {
        name,
        description,
        privateRoute:isPrivat,
        city_id,
        places,
        images
      }
      
    } )
    return 'good!'
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
    imageCount++
    images.push({ src: null, alt: null })
    }">добавить картинку</button>
    <hr>
    <div v-for="i in imageCount">
      image:{{ i }}
              <hr>
              <hr>
                <input type="text" placeholder="src" v-model="images[i - 1].src">
                <hr>
                <input type="text" placeholder="alt" v-model="images[i - 1].alt" >
              <hr>
              <hr>

    </div>
    <hr>
    <button @click="() => {
      placeCount++
      places.push({ name: null, description: null, images: [], lat: 0, lot: 0, count: 0 })
      }">добавить точку</button>
    <hr>
    <hr>
    <div v-for="i in placeCount">
        routePLace:{{ i }}
        <div>
          <hr>
          <hr>
          <div>
            <input type="text" placeholder="name" v-model="places[i - 1].name">
            <hr>
            <input type="text" placeholder="description" v-model="places[i - 1].description"> 
            <hr>
            <input type="number" placeholder="lat" v-model="places[i - 1].lat">
            <hr>
            <input type="number" placeholder="lot" v-model="places[i - 1].lot">
            <hr>
            <button @click="() => {
              places[i - 1].count++
              places[i - 1].images.push({ src: null, alt: null })
            }">добавить картинку</button>
            <div v-for="ii in places[i - 1].count">
              image:{{ ii }}
              <hr>
              <hr>
                <input type="text" placeholder="src" v-model="places[i - 1].images[ii - 1].src">
                <hr>
                <input type="text" placeholder="alt" v-model="places[i - 1].images[ii - 1].alt" >
              <hr>
              <hr>
            
            </div>
          </div>
          <hr>
          <hr>
        </div>

        
    </div>
    <button v-if="placeCount>=2" @click="createRoute(route.route_name, route.route_description, route.is_privat, 'volgs', places, images)">
      создать
    </button>
    <hr>
    {{ places }}
  </div>
  </Can>
</template>
