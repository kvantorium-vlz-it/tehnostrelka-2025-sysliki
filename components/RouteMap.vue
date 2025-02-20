<script setup lang="ts">
import { YandexMap, YandexMapControls, YandexMapDefaultFeaturesLayer, YandexMapDefaultSchemeLayer, YandexMapControl, YandexMapRuler, YandexMapFeature } from 'vue-yandex-maps';
import type { YandexMapRulerSettings } from 'vue-yandex-maps';
import type { YMap, YMapLocationRequest } from '@yandex/ymaps3-types/imperative/YMap';
import type { RulerCommonState, RulerPointState, UpdateEndFn } from '@yandex/ymaps3-types/modules/ruler/YMapRulerCommon';
import type { RenderPointArgs } from '@yandex/ymaps3-types/modules/ruler/YMapRuler';
import type { DrawingStyle, LngLat, LngLatBounds, RouteFeature, YMapMarkerEventHandler, ZoomRange } from '@yandex/ymaps3-types';

const map = shallowRef<YMap | null>(null);

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

    </yandex-map>
</template>