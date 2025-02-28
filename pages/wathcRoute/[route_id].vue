<script setup lang="ts">
import type { Route } from '~/assets/ts/zod/route';

import GeoJsonToGpx from "@dwayneparton/geojson-to-gpx"
import JSZip from "jszip"
import type { FeatureCollection, LineString } from "geojson";
import type { LngLat } from '@yandex/ymaps3-types';

// @ts-ignore
import tokml from "geojson-to-kml"

const route_id = useRoute().params.route_id
const routeLine = ref<LngLat[]>([])
const joinedPointsToString = computed(() => points.value.map((point) => point.toReversed().join(',')).join('|'))

const fetchRoute = async () => {
  const response = await $fetch<FeatureCollection>(`https://api.geoapify.com/v1/routing?waypoints=${joinedPointsToString.value}&mode=walk&type=short&apiKey=c09299584a5e46fab02a6b984e1a1aa5`)

  const coordinates = response.features[0].geometry.coordinates 
  const _points = coordinates.reduce((_c, __c) => [..._c, ...__c], []) as LngLat[]

  routeLine.value = _points
}

onMounted(() => {
    fetchRoute()

    console.log(route.data.value);
    
})

const route = await useAsyncData('route', async () => {
    const _route = await $fetch<[Route]>(`/api/routes/${route_id}`,{
        method:'GET'
    })
    // _route =  await $fetch(`/api/route/${props.route_id}`)
    //   console.log(a);
    
    
    
    console.log(route_id);
    
    
    
    return _route?.[0]
})

const points = computed<LngLat[]>(() => {
    return (route.data.value?.roulte_place || []).map((place) => [place.lot, place.lat])
})

// console.log(route_id);

 const a = await $fetch(`/api/ratings/rat/${route_id}`,{method:'GET'})


  
// console.log(a);




function createGoe(){
    const geojsonData  = reactive<FeatureCollection>({
        type: "FeatureCollection",
        features: route.data.value!.roulte_place.map((place) => ({
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
   const name  = `${route.data.value?.name}.${format}`
    
    
    if (format === "gpx") {
        const serializer = new XMLSerializer();
        content = serializer.serializeToString(GeoJsonToGpx(geojsonData))
        type = "application/gpx+xml";
        filename = route.data.value?.name+'.gpx';
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
        link.download = route.data.value?.name+`.kmz`;   
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

const addToVisited = async () => {
    const visitedBefore = await $fetch('/api/personal/visited', {
        method: 'get'
    })
    const isRouteVisitedBefore = visitedBefore.find((route) => route.id === +(route_id as string)) !== undefined

    if (isRouteVisitedBefore) {
        await $fetch('/api/visited', {
            method: 'delete',
            body: {
                route_id: +route_id,
            }
        })
    } else {
        await $fetch('/api/visited', {
            method: 'post',
            body: {
                route_id: +route_id,
            }
        })
    }
}

const addToFavorite = async() => {
    const favoritsBefore = await $fetch('/api/personal/favorits', {
        method: 'get'
    })
    const isRouteFavoritsBefore = favoritsBefore.find((route) => route.id === +(route_id as string)) !== undefined

    if (isRouteFavoritsBefore) {
        await $fetch('/api/favorites', {
            method: 'delete',
            body: {
                route_id: +route_id,
            }
        })
    } else {
        await $fetch('/api/favorites', {
            method: 'post',
            body: {
                route_id: +route_id,
            }
        })
    }
}

const comments = await $fetch(`/api/coments/${route_id}`, {
    method: 'get',
})

const comment = ref("")

const sendComment = async () => {
    await $fetch(`/api/coments`, {
        method: 'post',
        body: {
            text: comment.value,
            route_id: route_id,
        }
    })
}

const { loggedIn } = await useUserSession()
</script>

<template>

    <TheHeader v-model:selected-city-id="cityId" />
    <!-- <pre>{{ JSON.stringify(points, null , 4) }}</pre> -->
    <div class="create-the-route-area">
        <section class="route-parameters-area">
            <div class="grow">
                <section class="enter-the-parameter-global-area">
                    <div class="enter-the-parameter-area">
                        <label class="enter-the-parameter-title" for="route-name">название маршрута</label>
                        <p  class="enter-the-parameter-input main">{{ route.data.value?.name }}</p>
                    </div>
                    <div  class="enter-the-parameter-area">
                        <label class="enter-the-parameter-title" for="route-description">описание маршрута</label>
                        <p  class="enter-the-parameter-input description">{{ route.data.value?.description }}</p>
                    </div>
    
            <button @click="() => download('gpx')" class="route-reviews">
                Скачать в gpx
            </button>
            <button @click="() => download('kml')" class="route-reviews">
                Скачать в kml
            </button>
            <button @click="() => download('kmz')" class="route-reviews">
                Скачать в kmz
            </button>
    
            <div class="route-reviews">
                {{ route.data.value!._count.coments }} отзывов
            </div>
            <div class="route-reviews-1">
                Оценка: {{ a }} 
            </div>

            <div class="route-reviews">
                <Icon name="mdi:eye-outline" />
                {{ route.data.value!._count.visited }}
            </div>
            

            <div class="route-favorites">
                <Icon name="mdi:bookmark" />
                {{ route.data.value!._count.favorites }}
            </div>
                </section>
          
        
            </div>
            <section class="end">

                <!-- <button class="tab-menu-area-button" onclick="history.go(-1)">
                    
                    <img src="~/public/pics/back-icon.svg" class="back-icon">
                    <p class="tab-menu-area-title">история</p>
                </button> -->

                <button class="tab-menu-area-button-green" @click="addToFavorite">
                    <Icon name="mdi:bookmark-outline"  class="save-in-icon" /> 
                    <p class="tab-menu-area-title white">сохранить</p>
                </button>
                <button class="tab-menu-area-button-green" @click="addToVisited">
                    <Icon name="mdi:bookmark-outline" class="save-in-icon" /> 
                    <p class="tab-menu-area-title white">Посетил</p>
                </button>
                <button class="tab-menu-area-button" onclick="history.go(-1)">
                    
                    <img src="~/public/pics/back-icon.svg" class="back-icon">
                    <p class="tab-menu-area-title">вернуться назад</p>
                </button>
            </section>
        </section>

        <section  >
            <routeMapWatch
            class="map-area"
            v-model:points="points"
            v-model:route-points="routeLine"
            @render-route="fetchRoute"
            
        />
        </section>

        <section class="add-points-area">
            <!-- <div class="search-area">
                <p class="search-title"> Добавьте место а затем<br> выберите точку на карте</p>
                <p class="search-title">или создайте <br> своё место</p>
            </div> -->

            <ScrollAreaRoot class="scroll-area-root">
                <ScrollAreaViewport class="add-points-scroll h-full overflow-hidden " style="height: 100%;">
                    <div v-for="(place, placeIndex) in route.data.value?.roulte_place" :key="placeIndex" class="test-swipe h-full">
                       <AddPointBlock
                        :name="place.name!"
                        :index="placeIndex + 1"
                        :description="place.description"
                        :images="place.route_place_image.map((routePlaceImage) => routePlaceImage.image.src)"
                       >
                    </AddPointBlock>
                    </div>
                    <!-- <AddNewPointBlock></AddNewPointBlock> -->
                 </ScrollAreaViewport>
                 <ScrollAreaScrollbar orientation="vertical">
                     <ScrollAreaThumb class="scroll-area-thumb" />
                </ScrollAreaScrollbar>
            </ScrollAreaRoot>
        </section>

        <div class="comments-section">
            <div class="comments-section-heading">
                Комментарии
            </div>

            <div style="background-color: #F5F5F5; padding: 2rem" v-if="loggedIn">
                <input type="text" v-model="comment" style="padding: 2rem; border: 1px solid #F5F5F5;">

                <button @click="sendComment" style="background-color: #89C587; padding: 2rem;">
                    Оставить комментарий
                </button>
            </div>

            <div class="comments-list">
                <div v-for="comment in comments" class="comment" >
                    {{ comment.text }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.route-reviews {
    font-size: 1.6rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #0000008e;
}
.route-favorites {
    font-size: 1.6rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #00000086;
}
.route-reviews-1 {
    border-radius: 100vw;
    background-color: #89C587;
    color: white;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    width: fit-content;
}
*{
    Border-radius: 2.5rem;
    Border: none;
}
    .save-in-icon{
        /* width: 3rem; */
        font-size: 3rem;
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
        max-width: 32rem;
    }

    .map-area{
        height: 100%;
        background-color: #89C587;
        border-radius: 2.5rem;
      
        padding: 0;
    }


    .create-the-route-area{
        width: 100vw;
        /* height: 75rem; */
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
        /* border: 0.1rem solid transparent; */
        /* border-bottom: 2px dashed #000000; */
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

.comments-section {
    margin-top: 7.6rem;
}
.comments-section-heading {
    font-size: 6.4rem;
    color: #000000;
}
.comments-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 4rem;
}
.comment {
    padding: 2rem;
    background-color: #F5F5F5;
    border-radius: 2rem;
    font-size: 2rem;
}
</style>