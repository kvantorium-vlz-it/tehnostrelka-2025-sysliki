<script setup lang="ts">
import { YandexMap, YandexMapControls, YandexMapDefaultFeaturesLayer, YandexMapDefaultSchemeLayer, YandexMapControl, YandexMapRuler, YandexMapFeature } from 'vue-yandex-maps';
import type { YandexMapRulerSettings } from 'vue-yandex-maps';
import type { YMap, YMapLocationRequest } from '@yandex/ymaps3-types/imperative/YMap';
import type { RulerCommonState, RulerPointState, UpdateEndFn } from '@yandex/ymaps3-types/modules/ruler/YMapRulerCommon';
import type { RenderPointArgs } from '@yandex/ymaps3-types/modules/ruler/YMapRuler';
import type { DrawingStyle, LngLat, LngLatBounds, RouteFeature, YMapMarkerEventHandler, ZoomRange } from '@yandex/ymaps3-types';

const map = shallowRef<YMap | null>(null);

const state = shallowRef<RenderPointArgs[]>([]);
const mode = ref<YandexMapRulerSettings['type']>('ruler');
const editable = ref(true);

withDefaults(defineProps<{
    points?: LngLat[]
}>(), {
    points: () => []
})
</script>

<template>
    <yandex-map
        v-model="map"
        style="height: 500px;"
        height="1000"
        :settings="{
            location: {
            center: [44.516975,48.707067],
            zoom:9
            },
            showScaleInCopyrights: true,
        }"
        width="1000"
    >
        <yandex-map-default-scheme-layer/>
        <yandex-map-default-features-layer/>

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
            }"
        >
            <template #point="{ state: pointState, onDelete }">
                <div
                    class="point"
                    :class="{ 'point--last': pointState.index === pointState.totalCount - 1 }"
                    @click="($event.target as HTMLElement).classList.toggle('point--active')"
                >
                    <div class="point_popup">
                        <!-- {{ getLabel(pointState) }} -->

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
        </yandex-map-ruler>

    </yandex-map>
</template>