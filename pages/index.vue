<script setup lang="ts">
import type { LngLat } from '@yandex/ymaps3-types';
import type { FeatureCollection, LineString } from "geojson";

const { data: cities } = await useAsyncData('cities', async () => await $fetch('/api/getAll/city'))


const cityId = ref('' + cities.value[0].id) 


const bestRoute = await $fetch(`/api/bestRoute/${cityId.value}`,{
    method:'GET'
})

const points = ref<LngLat[]>([
  ])


const routeLine = ref<LngLat[]>([])

const joinedPointsToString = computed(() => points.value.map((point) => point.toReversed().join(',')).join('|'))

const fetchRoute = async () => {
  const response = await $fetch<FeatureCollection>(`https://api.geoapify.com/v1/routing?waypoints=${joinedPointsToString.value}&mode=walk&type=short&apiKey=c09299584a5e46fab02a6b984e1a1aa5`)

  const coordinates = response.features[0].geometry.coordinates 
  const _points = coordinates.reduce((_c, __c) => [..._c, ...__c], []) as LngLat[]

  routeLine.value = _points
}


</script>

<template>
    <TheHeader v-model:selected-city-id="cityId" />
    
    <TheHero :best-route="bestRoute" />
    <InformationCards style="margin-top: 16.2rem;"/>

    <routeMapPlace
      style="margin-top: 2rem;"
        v-model:points="points"
        v-model:route-points="routeLine"
        @render-route="fetchRoute"
    />
    <RoutesList 
      :city_id="+cityId"
      style="margin-top: 2rem;"/>
</template>