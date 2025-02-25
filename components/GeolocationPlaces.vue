<script setup lang="ts">
    const [lot] = defineModel<number>('lot', {
        required:true
    })
    const [lat] = defineModel<number>('lat', {
        required:true
    })
    const [radius] = defineModel<number>('radius', {
        required:true
    })

    const places = ref<any>([])

    async function fetchPlaces() {
        const result = await $fetch("https://overpass-api.de/api/interpreter", {
       
        method: "POST",
        body: "data="+ encodeURIComponent(`
            [out:json][timeout:90];
            node[amenity~"college|school|cafe|bus_station|bank|clinic|cinema"](around:${radius.value},${lat.value},${lot.value});
            out body;
        `)
        })
        places.value = result
    }
</script>

<template>
    <slot
        :fetchPlaces="fetchPlaces"
        :places="places"
    />

</template>