<script setup lang="ts">
import type { Route } from '~/assets/ts/zod/route';

import GeoJsonToGpx from "@dwayneparton/geojson-to-gpx"
import JSZip from "jszip"
import type { FeatureCollection, LineString } from "geojson";
import type { LngLat } from '@yandex/ymaps3-types';

// @ts-ignore
import tokml from "geojson-to-kml"
import { Link } from '#components';


const { data: cities } = await useAsyncData('cities', async () => await $fetch('/api/getAll/city'))

const cityId = ref('' + cities.value[0].id)


const points = ref<LngLat[]>([])
const routeLine = ref<LngLat[]>([])
const joinedPointsToString = computed(() => points.value.map((point) => point.toReversed().join(',')).join('|'))

const fetchRoute = async () => {
  const response = await $fetch<FeatureCollection>(`https://api.geoapify.com/v1/routing?waypoints=${joinedPointsToString.value}&mode=walk&type=short&apiKey=c09299584a5e46fab02a6b984e1a1aa5`)

  const coordinates = response.features[0].geometry.coordinates 
  const _points = coordinates.reduce((_c, __c) => [..._c, ...__c], []) as LngLat[]

  routeLine.value = _points
}

const route = reactive<Route>({
    city_id: +cityId.value,
    description: '',
    images: [],
    name: '',
    places: [],
    privateRoute: true,
    approved:false,
})
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
    zip.file("doc.kml", tokml(geojsonData));
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
const handleSubmit = async () => {
    
    
    await fetchRoute()
    const response = await $fetch('/api/routes', {
        method: 'POST',
        body: route,
        // onResponseError(error) {
            //     console.error(error.response._data.message.map((error) => error.message).join(', '))
            // },
        })
        navigateTo('/')
    
 
}

const onAddPoint = () => {
}

const switchState = ref(true)
</script>

<template>
    <TheHeader v-model:selected-city-id="cityId" />
    {{  }}
    <div class="create-the-route-area">
        <section class="route-parameters-area">
            <div class="grow">
                <section class="enter-the-parameter-global-area">
                    <div class="enter-the-parameter-area">
                        <label class="enter-the-parameter-title" for="route-name">название маршрута</label>
                        <input v-model="route.name" placeholder="route name" type="text" class="enter-the-parameter-input main">
                    </div>
                    <div  class="enter-the-parameter-area">
                        <label class="enter-the-parameter-title" for="route-description">описание маршрута</label>
                        <input v-model="route.description" placeholder="route description" type="text" class="enter-the-parameter-input description">
                    </div>
                    <div>
                        <imageInputForm @update="(files) => route.images = files"/>
                    </div>

                </section>
                <section class="public-parametr-area">
                    <label class="public-parametr-title">приватный</label>
                    <div class="public-parametr" :class="{ 'is-checked': !route.privateRoute }">
                        <SwitchRoot  id="public" v-model:checked="route.privateRoute" class="switch-root" style="background: #89C587; border: none; border-radius: 2.5rem;">
                            
                            <SwitchThumb class="switch-thumb" />
                        </SwitchRoot> 
                        
                    </div>
                </section>
            </div>
            <section class="end">
                <button @click="handleSubmit" class="tab-menu-area-button-green">
                    <img src="../public/pics/save-in-icon.svg" class="save-in-icon">
                    <p class="tab-menu-area-title white">сохранить</p>
                </button>
                <button class="tab-menu-area-button" onclick="history.go(-1)">
                    <img src="../public/pics/back-icon.svg" class="back-icon">
                    <p class="tab-menu-area-title">вернуться назад</p>
                </button>
            </section>
        </section>

        <section  >
            <RouteMap
            class="map-area"
            v-model:points="points"
            v-model:route-points="routeLine"
            @render-route="fetchRoute"
            @add-point="onAddPoint"
        />
        </section>

        <section class="add-points-area">
            <div class="search-area">
                <p class="search-title"> Добавьте место а затем<br> выберите точку на карте</p>
            </div>
            <ScrollAreaRoot class="scroll-area-root">
                <ScrollAreaViewport class="add-points-scroll h-full overflow-hidden " style="height: 100%;">
                    <div v-for="(place, placeIndex) in route.places" :key="placeIndex" class="test-swipe h-full">
                        <input style="padding: 1.5rem 2rem;" type="text" v-model="place.name" :placeholder="`Название точки ${placeIndex}`">
                        <input style="padding: 1.5rem 2rem;" type="text" v-model="place.description" :placeholder="`Описание точки ${placeIndex}`">

                           <GeolocationPlaces
                               v-model:lat="place.lat"
                               v-model:lot="place.lot"
                               :radius="300"
                               #="{fetchPlaces, places: nearPlaces, clear}"
                            >
                               <button type="button" @click="fetchPlaces">получить ближайшие места</button>
                       
                               <div v-for="nearPlace in nearPlaces.elements?.filter((nearPlace) => 'name' in nearPlace.tags)">
                                   <button
                                        @click="() => {
                                            place.name = nearPlace.tags.name
                                            clear()
                                        }"
                                        style="border: 1px solid black; border-radius: 20px; padding: 5px;"
                                    >
                                       {{ nearPlace.tags.name }}
                                   </button>
                               </div>
                           </GeolocationPLaces>
       
                           <div>
                               <imageInputForm @update="(files) => place.images = files"/>
                           </div>

                       <!-- <AddPointBlock
                        :name="place.name!"
                        :index="placeIndex + 1"
                       >
                           
                           <input type="text" v-model="place.name" :placeholder="`Place ${placeIndex} name`">
                           <input type="text" v-model="place.description" :placeholder="`Place ${placeIndex} description`">
                           <GeolocationPlaces
                               v-model:lat="place.lat"
                               v-model:lot="place.lot"
                               :radius="300"
                               #="{fetchPlaces, places}">
                               <button type="button" @click="fetchPlaces">получить ближайшие места</button>
                       
                               <div v-for="place in places.elemets">
                                   <div style="border: 1px solid black; border-radius: 20px; padding: 5px;">
                                       {{ JSON.stringify(place, null, 4) }}
                                   </div>
                               </div>
                           </GeolocationPLaces>
       
                           <div>
                               <imageInputForm @update="(files) => place.images = files"/>
                           </div>
                    </AddPointBlock> -->
                    </div>
                    <!-- <AddNewPointBloc k></AddNewPointBlock> -->
                 </ScrollAreaViewport>
                 <ScrollAreaScrollbar orientation="vertical">
                     <ScrollAreaThumb class="scroll-area-thumb" />
                </ScrollAreaScrollbar>
            </ScrollAreaRoot>
        </section>
    </div>
</template>

<style scoped>
*{
    Border-radius: 2.5rem;
    Border: none;
}
    .save-in-icon{
        width: 3rem;
    }
    .back-icon{
        width: 2.4rem;
    }
    .public-parametr{
        width: 5.1rem;
        padding-top: 0.1rem;
        padding-left: 0.2rem;
        height: 3.1rem;
        background-color: #89C587;
        transition: background-color 0.1s;
    }
    .public-parametr.is-checked {
        background-color: #A3A3A3;
        border-radius: 2.5rem;
    }
    .scroll-area-root{
        padding-top: 2rem;
        height: 91%;
        max-height: 740px;
    }
    .add-points-scroll{
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .switch-root {
        width: 100%;
        height: 100%;
        background-color: #89C587;
        border: none;
        border-radius: 100vw;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    .switch-root:focus {
        box-shadow: 0 0 0 2px black;
    }
    .switch-root[data-state='checked'] {
        background-color: #89C587;
    }
    
    .switch-thumb {
        display: block;
        width: 2.8rem;
        height: 2.8rem;
        background-color: #FFFFFF;
        border-radius: 100vw;
        transition: transform 100ms;
        will-change: transform;
        border: none;
    }
    .switch-thumb[data-state='checked'] {
        transform: translateX(19px);
    }
    .search-area{
        display: flex;
        flex-direction: row;
        gap: 2rem;
        align-items: center;
    }
    .test-swipe{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin-top: 2rem;
    }
    .search-title{
        font-size: 1.6rem;
    }
    .search-input{
        width: 29.1rem;
        height: 6.1rem;
        font-size: 1.6rem;
        padding: 2rem;
        padding-left: 5rem;
        background-image: url(../public/pics/search-icon.svg);
        background-repeat: no-repeat;
        background-position: 1.3rem center;
    }

    .add-points-area{
        background-color: #F5F5F5;
        padding: 2rem;
        border-radius: 2.5rem;
    }

    .map-area{
        height: 100%;
        background-color: #89C587;
        border-radius: 2.5rem;
      
        padding: 0;
    }


    .create-the-route-area{
        width: 100vw;
        height: 75rem;
        margin-bottom: 5.2rem;
        padding-left: 4rem;
        padding-right: 4rem;
        display: grid;
        grid-template-columns: 1fr 2fr auto;
        gap: 2rem;
    }
    .route-parameters-area{
        width: 35.2rem;
        height: 75rem;
        background-color: #FFFFFF;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    .enter-the-parameter-input{
        width: 100%;
        border-radius: 0rem;
        outline: none;
        border: 0.1rem solid transparent;
        border-bottom: 2px dashed #000000;
    }
    .grow{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 7rem;
    }
    .end{
        justify-self: flex-end;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .tab-menu-area-button{
        width: 100%;
        height: 6.1rem;
        background-color: #FFFFFF;
        padding-left: 2.4rem;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 0.6rem;
        border: none;
        border-radius: 2.5rem;
    }
    .tab-menu-area-button:hover{
        background-color: #F5F5F5;
    }
    .tab-menu-area-title{
        font-size: 1.6rem;
        color: #000000;
        line-height: 0;
    }
    .white{
        color: #FFFFFF;
    }
    .tab-menu-area-button-green{
        width: 100%;
        height: 6.1rem;
        background-color: #89C587;
        padding-left: 2.4rem;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 0.6rem;
        border: none;
        border-radius: 2.5rem;
    }
    
    .public-parametr-area{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-radius: 2.5rem;
    }
    .public-parametr-title{
        font-size: 1.6rem;
        color: #000000;
    }
    .enter-the-parameter-global-area{
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .main{
        font-size: 3.2rem;
        color: #000000;
    }
    .description{
        font-size: 1.6rem;
        color: #000000;
    }
    .enter-the-parameter-title{
        font-size: 1.6rem;
        color: #A3A3A3;
    }
    .enter-the-parameter-area{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
</style>