<script setup lang="ts">
import { YandexMap, YandexMapControls,YandexMapMarker,YandexMapDefaultMarker, YandexMapDefaultFeaturesLayer, YandexMapDefaultSchemeLayer, YandexMapControl, YandexMapRuler, YandexMapFeature, } from 'vue-yandex-maps';
import type { YandexMapRulerSettings } from 'vue-yandex-maps';
import type { YMap, YMapLocationRequest } from '@yandex/ymaps3-types/imperative/YMap';
import type { RulerCommonState, RulerPointState, UpdateEndFn } from '@yandex/ymaps3-types/modules/ruler/YMapRulerCommon';
import type { RenderPointArgs } from '@yandex/ymaps3-types/modules/ruler/YMapRuler';
import type { DrawingStyle, LngLat, LngLatBounds, RouteFeature, YMapMarkerEventHandler, ZoomRange } from '@yandex/ymaps3-types';

// import { useGeolocation } from '@vueuse/core'

const { coords, locatedAt, error, resume, pause } = useGeolocation()


const map = shallowRef<YMap | null>(null);

const state = shallowRef<RenderPointArgs[]>([]);
const mode = ref<YandexMapRulerSettings['type']>('ruler');
const editable = ref(true);
//  const placess = ref()


const points = defineModel<LngLat[]>('points', {
    default: () => [],
})
const routePoints = defineModel<LngLat[]>('routePoints', {
    default: () => [],
})


defineEmits<{
    (e: 'renderRoute'): void
}>()
</script>

<template>

  
    <GeolocationPlaces
        v-model:lat="coords.latitude"
        v-model:lot="coords.longitude"
        :radius="500"
        #="{fetchPlaces, places}"
    >
    <Container class="body">
        
        
        <h1 class="places-near-title">места рядом</h1>
        <yandex-map
            class="map"
            v-model="map"
            style="height: 62rem;"
            :settings="{
                location: {
                    center: [coords.longitude,coords.latitude],
                    zoom:14
                },
                showScaleInCopyrights: true,
                zoomRange: {
                    min: 4,
                    max: 25,
                },
                
            }"
        >
        <yandex-map-default-scheme-layer/>
                  
        <yandex-map-marker
        position="top-center left-center"
        :settings="{ coordinates: [coords.longitude,coords.latitude] }"
    >
        <div style="border-radius: 100vw; background-color: #ffffff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); border: 1px solid black;">
            <Icon name="mdi:user" style="font-size: 3rem;" />
        </div>
        <!-- <img
            alt=""
            class="pin"
            :src=""
            @click="produceAnAlert"
        > -->
    </yandex-map-marker>
            
        <yandex-map-default-marker 
            v-for="(place, index) in places.elements" 
            
            :key="index"
            :settings="{ coordinates: [+place.lon,+place.lat ], title: place.tags.name }"
        /> 
        
        <yandex-map-default-features-layer/>

        

        

        
        
        
        <!-- <yandex-map-feature
        :settings="{
            geometry: {
                type: '',
                coordinates: routePoints,
                },
                style: {
                    stroke: [{ width: 8, color: '#007afce6' }],
                    fill: 'rgba(0, 0, 0, 0)',
                    },
                    }"
                    /> -->
                </yandex-map>
        <button type="button" @click="fetchPlaces">получить ближайшие места</button>
                
                
                
            </Container>
    </GeolocationPLaces>
</template>


<style scoped>
    .body{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
    }
    .map{
        clip-path: polygon(
            2.5rem 0, 
            calc(100% - 2.5rem) 0, 
            100% 2.5rem, 
            100% calc(100% - 2.5rem), 
            calc(100% - 2.5rem) 100%, 
            2.5rem 100%, 
            0 calc(100% - 2.5rem), 
            0 2.5rem
        );
    }   
    .places-near-title{
        font-size: 6.4rem;
        font-weight: 400;
        color: #589977;
    }
</style>