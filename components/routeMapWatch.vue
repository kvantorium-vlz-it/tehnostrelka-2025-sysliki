<script setup lang="ts">
import { YandexMap, YandexMapControls, YandexMapDefaultMarker, YandexMapDefaultFeaturesLayer, YandexMapDefaultSchemeLayer, YandexMapControl, YandexMapRuler, YandexMapFeature } from 'vue-yandex-maps';
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

const points = defineModel<LngLat[]>('points', {
    default: () => [],
})
const routePoints = defineModel<LngLat[]>('routePoints', {
    default: () => [],
})

const onUpdateRuler = (state: RulerCommonState) => {
    points.value = state.points
}

const emit = defineEmits<{
    (e: 'renderRoute'): void
    (e: 'addPoint'): void
}>()

watch(state, (newValue, oldValue) => {
    if (newValue.length > oldValue.length) {
        emit('addPoint')
    }
})

</script>

<template>
    <Container style="border-radius: 2rem; overflow: hidden;">
        <yandex-map
            v-model="map"
            style="height: 800px; "
            :settings="{
                location: {
                    center: points[0],
                    zoom:14
                },
                showScaleInCopyrights: true,
                zoomRange: {
                    min: 4,
                    max: 25,
                }
            }"
        >
            <yandex-map-default-scheme-layer/>
            <yandex-map-default-features-layer/>

            <yandex-map-default-marker
                v-for="(place, index) in points" 
                
                :key="index"
                :settings="{ coordinates: [+place[0],+place[1] ] , title: (index + 1).toString() }"
            /> 
<!-- 


            <yandex-map-ruler
                v-model:points-state="state"
                :settings="{
                    type: mode,
                    points: points,
                    editable,
                    geometry: {
                        style: {
                            simplificationRate: 0,
                            fill: '#666',
                            fillOpacity: 0.3,
                            stroke: [
                                { width: 3, opacity: 0.7, color: '#666' },
                                { width: 5, opacity: 0.7, color: '#fff' },
                            ],
                            
                        }
                    },
                    onUpdate: onUpdateRuler
                }"
            >
                <template #point="{ state: pointState, onDelete }">
                    <div
                        class="point"
                        :class="{ 'point--last': pointState.index === pointState.totalCount - 1 }"
                        @click="($event.target as HTMLElement).classList.toggle('point--active')"
                    >
                        <div class="point_popup">
                             {{ getLabel(pointState) }} -->
<!-- 
                            <div
                                class="point_popup_delete"
                                @click.stop.prevent="onDelete()"
                            >
                                Удалить точку
                            </div>
                        </div>
                    </div>
                </template>
                <template #previewPoint>
                    <div class="point point--preview"></div>
                </template>
            </yandex-map-ruler> --> 


            
        <yandex-map-feature
            :settings="{
                geometry: {
                    type: 'LineString',
                    coordinates: routePoints,
                },
                style: {
                    stroke: [{ width: 8, color: '#007afce6' }],
                    fill: 'rgba(0, 0, 0, 0)',
                },
            }"
        />
        </yandex-map>
        <!-- {{ points }} -->

    </Container>
</template>