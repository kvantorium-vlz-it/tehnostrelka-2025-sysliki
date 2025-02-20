<script setup lang="ts">
import type { LngLat } from '@yandex/ymaps3-types';
const { loggedIn, user, session, fetch, clear } = useUserSession()
  const points = ref<LngLat[]>([
    [44.685846951952776, 48.78107863881559],
    [44.787470487109026, 48.8121529405401],
    [44.81012978886684, 48.772909916504],
    [44.7311655554684, 48.74657938243983],
  ])
  const route = ref<LngLat[]>([])

  const joinedPointsToString = computed(() => points.value.map((point) => point.toReversed().join(',')).join('|'))

  const fetchRoute = async () => {
    const response = await $fetch(`https://api.geoapify.com/v1/routing?waypoints=${joinedPointsToString.value}&mode=walk&type=short&apiKey=c09299584a5e46fab02a6b984e1a1aa5`)

    const coordinates = response.features[0].geometry.coordinates
    const _points = coordinates.reduce((_c, __c) => [..._c, ...__c], []) as LngLat[]

    route.value = _points
  }
</script>

<template>
  <RouteMap
    v-model:points="points"
    v-model:route-points="route"
    @render-route="fetchRoute"
  />

  <hr>
  <!-- Joined: {{ joinedPointsToString }} -->

  <hr>
  <!-- Points: {{ points }} -->

  <hr>

  <button @click="() => points.push([44.763781217089495, 48.783801249140694])">
    +
  </button>

  <!-- {{ route }} -->

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
