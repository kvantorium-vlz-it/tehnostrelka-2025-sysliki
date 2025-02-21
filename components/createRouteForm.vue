<script setup lang="ts">
import type { ServerFile } from 'nuxt-file-storage';
import type { Route } from '~/assets/ts/zod/route';
// import type { GeoJson } from '~/assets/ts/geoJson'
import GeoJsonToGpx from "@dwayneparton/geojson-to-gpx"
import JSZip from "jszip"
import type { FeatureCollection, LineString } from "geojson";
import type { LngLat } from '@yandex/ymaps3-types';

// @ts-ignore
import tokml from "geojson-to-kml"
import type { FeatureClickEvents } from '@yandex/ymaps3-types/imperative/YMapFeature/types';

const points = ref<LngLat[]>([
    [44.685846951952776, 48.78107863881559],
    [44.787470487109026, 48.8121529405401],
    [44.81012978886684, 48.772909916504],
    [44.7311655554684, 48.74657938243983],
  ])
// function pontsInput() {

//     points.value.map((ponit) => route.places.push({ images: [], lat: ponit[0], lot:ponit[1]  }))
// // }
// watch(points, pontsInput)

const routeLine = ref<LngLat[]>([])

const joinedPointsToString = computed(() => points.value.map((point) => point.toReversed().join(',')).join('|'))

const fetchRoute = async () => {
  const response = await $fetch<FeatureCollection>(`https://api.geoapify.com/v1/routing?waypoints=${joinedPointsToString.value}&mode=walk&type=short&apiKey=c09299584a5e46fab02a6b984e1a1aa5`)

  const coordinates = response.features[0].geometry.coordinates 
  const _points = coordinates.reduce((_c, __c) => [..._c, ...__c], []) as LngLat[]

  routeLine.value = _points
}

const route = reactive<Route>({
    city_id: 1,
    description: '',
    images: [],
    name: '',
    places: [],
    privateRoute: true,
})

// function geoJson() {
    watch(points, () => {
    route.places = points.value.map((coords, index) => ({
    name: `Точка ${index + 1}`,
    description: '',
    lat: coords[1],
    lot: coords[0],
    images:[]
  }));
}, { deep: true }); 

function createGoe(){
    const geojsonData  = reactive<FeatureCollection>({
        type: "FeatureCollection",
        features: route.places.map((place) => ({
        type:'Feature',
            geometry:{
                type:'Point',
                coordinates: [place.lot, place.lat]
                
            },
            properties: {
                name: place.name,
                description: place.description,
            }
            
    
        })),

    })

    geojsonData.features.push({
        type:'Feature',
        geometry:{
            type:"LineString",
            coordinates:[...routeLine.value.map((point) => [point[0], point[1]])]
        },
        properties:{}
    })
    

    return geojsonData

}

    function download(format:string) {
    let content, type, filename;
    const geojsonData = createGoe()
   const name  = `${route.name}.${format}`
    
    
    if (format === "gpx") {
        const serializer = new XMLSerializer();
        content = serializer.serializeToString(GeoJsonToGpx(geojsonData))
        type = "application/gpx+xml";
        filename = route.name+'.gpx';
    } else if (format === "kml") {
        content = tokml(geojsonData);
        type = "application/vnd.google-earth.kml+xml";
        filename = name;
    } else if (format === "kmz") {
        const zip = new JSZip();               
    zip.file("doc.kml", tokml(geojsonData)); // Добавляем KML в архив

    zip.generateAsync({ type: "blob" }).then((blob) => {
        const link = document.createElement("a");   
        link.href = URL.createObjectURL(blob);   
        link.download = route.name+`.kmz`;   
        link.click();   
        URL.revokeObjectURL(link.href);
    });

    return
  }

  const blob = new Blob( [content], {type});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename!;
  link.click();
  URL.revokeObjectURL(link.href);
};

// const handleRouteFileChange = (event: Event, index: number) => {
//     const target = event.target as HTMLInputElement
//     const file = target.files?.[0] as unknown as ServerFile
//     route.images[index] = file
// }

// const handleRoutePlaceFileChange = (event: Event, placeIndex: number, imageIndex: number) => {
//     const target = event.target as HTMLInputElement
//     const file = target.files?.[0] as unknown as ServerFile
//     route.places[placeIndex].images[imageIndex] = file
// }

// const createImageURL = (image: File | ServerFile |  null) => { 
//     if (image === null) {
//         return ''
//     }

//     return URL.createObjectURL(image as Blob)
// }


const handleSubmit = async () => {
    const response = await $fetch('/api/routes', {
        method: 'POST',
        body: route,
        // onResponseError(error) {
        //     console.error(error.response._data.message.map((error) => error.message).join(', '))
        // },
    })

    console.log(response)
}
</script>


<template>
    <RouteMap
            v-model:points="points"
            v-model:route-points="routeLine"
            @render-route="fetchRoute"
        />
    <form >
        
        <h1>создание маршрутаа</h1>

        <input type="text" v-model="route.name" placeholder="route name">
        <input type="text" v-model="route.description" placeholder="route description">
        <label> приватный?<input  v-model="route.privateRoute" type="checkbox"></label>

        <hr>

        <div>
            <imageInputForm @update="(files) => route.images = files"/>
        </div>




        <div>
            <div v-for="(place, placeIndex) in route.places">
                <input type="text" v-model="place.name" :placeholder="`Place ${placeIndex} name`">
                <input type="text" v-model="place.description" :placeholder="`Place ${placeIndex} description`">
                <!-- <div>
                    <input type="number" v-model.number="points[placeIndex][0]"  placeholde="lat">
                    <input type="number" v-model.number="points[placeIndex][1]"  placeholde="lot">
                </div> -->

                <div>
                    <imageInputForm @update="(files) => place.images = files"/>
                </div>
                <hr>
            </div>
        </div>

<!-- 
        <button @click="() =>  route.places.push({ images: [], lat: 0, lot: 0 })">
            +
        </button> -->
        <!-- <button type="button" @click="() => {route.places.push({ images: [], lat: 0, lot: 0 })}">
            + место
        </button> -->

        <button type="submit">
            Отправить
        </button>
        
        {{ route }}
    </form>
    <button @click="download('gpx')">Скачать GPX</button>
    <button @click="download('kml')">Скачать KML</button>
    <button @click="download('kmz')">Скачать KMZ</button>


</template>