<script setup lang="ts">
import type { ServerFile } from 'nuxt-file-storage';
import type { Route } from '~/assets/ts/zod/route';
import type { GeoJson } from '~/assets/ts/zod/geoJson'





const route = reactive<Route>({
    city_id: 1,
    description: '',
    images: [],
    name: '',
    places: [],
    privateRoute: true,
})

// function geoJson() {
    
    const geojsonData  = reactive<GeoJson>({
        type: "FeatureCollection",
        features: []
    
    })

    function createGoe(){
        route.places.map((v) => {
            if (v.name && v.description) {
                
                geojsonData.features.push({
                        type:'Feature',
                        geometry: {
                        type: "Point",
                        coordinates: [v.lot, v.lat]
                    },
                    properties: {
                        name: v.name,
                        description: v.description
                    }
                })
            }else {
                geojsonData.features.push({
                        type:'Feature',
                        geometry: {
                        type: "Point",
                        coordinates: [v.lot, v.lat]
                    },
                   
                })
        
            }
        
        })
        geojsonData.features.push({
            type: 'Feature',
            geometry: {
                type: "LineString",
                coordinates: ...dataPoints// предпологаемый масив точек поставляемый от карты
            }
        })

    }


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
    <form >
        <h1>создание маршрутаа</h1>

        <input type="text" placeholder="route name">
        <input type="text" placeholder="route description">
        <label> приватный?<input type="checkbox"></label>

        <hr>

        <div>
            <imageInputForm @update="(files) => route.images = files"/>
        </div>




        <div>
            <div v-for="(place, placeIndex) in route.places">
                <input type="text" v-model="place.name" :placeholder="`Place ${placeIndex} name`">
                <input type="text" v-model="place.description" :placeholder="`Place ${placeIndex} description`">
                <div>
                    <input type="number" v-model.number="place.lat" placeholde="lat">
                    <input type="number" v-model.number="place.lot" placeholde="lot">
                </div>

                <div>
                    <imageInputForm @update="(files) => place.images = files"/>
                </div>
                <hr>
            </div>
        </div>

        <button type="button" @click="() => {route.places.push({ images: [], lat: 0, lot: 0 })}">
            + место
        </button>

        <button type="submit">
            Отправить
        </button>

    </form>


</template>