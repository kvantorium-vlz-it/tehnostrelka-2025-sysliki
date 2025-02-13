<script setup lang="ts">
import type { ServerFile } from 'nuxt-file-storage';
import type { Route } from '~/assets/ts/zod/route';






const route = reactive<Route>({
    city_id: 1,
    description: '',
    images: [],
    name: '',
    places: [],
    privateRoute: true,
})


const handleRouteFileChange = (event: Event, index: number) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0] as unknown as ServerFile
    route.images[index] = file
}

const handleRoutePlaceFileChange = (event: Event, placeIndex: number, imageIndex: number) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0] as unknown as ServerFile
    route.places[placeIndex].images[imageIndex] = file
}

const createImageURL = (image: File | ServerFile |  null) => { 
    if (image === null) {
        return ''
    }

    return URL.createObjectURL(image as Blob)
}


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
            <div v-for="(image, i) in route.images">
                {{ i }}
                <input type="file" @change="(event) => handleRouteFileChange(event, i)">
                <button type="button" @click="() => {route.images.splice(i, 1); console.log(createImageURL(image));
                }">X</button>

                <img :src=" createImageURL(image)" alt="" width="50">
            </div>
        </div>


        <button type="button" @click="() => route.images.push(null)">+ изображение маршрута</button>


        <div>
            <div v-for="(place, placeIndex) in route.places">
                <input type="text" v-model="place.name" :placeholder="`Place ${placeIndex} name`">
                <input type="text" v-model="place.description" :placeholder="`Place ${placeIndex} description`">
                <div>
                    <input type="number" v-model.number="place.lat" placeholde="lat">
                    <input type="number" v-model.number="place.lot" placeholde="lot">
                </div>

                <div>
                    <div v-for="(image, imageIndex) in place.images">
                        <input type="file" @change="(event) => handleRoutePlaceFileChange(event, placeIndex, imageIndex)">
                        <button type="button" @click="() => place.images.splice(imageIndex - 1, 1)">X</button>
                        <img v-if="image" :src="createImageURL(image)" alt="" width="70">
                    </div>

                    <button type="button" @click="() => {place.images.push(null)}">
                        + изображение места
                    </button>
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