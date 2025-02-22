<template>
    <div>
        <input type="checkbox" v-model="isVisited" @input="handleInput()">
    </div>
</template>

<script setup lang="ts">
    const isVisited = ref(true)
   const emit = defineEmits<{
        (e: 'mark-as-visited'):void
        (e: 'remove-from-visited'):void
        (e: 'toggle-visited', isVisited: boolean):void
    }>()

    const handleInput = () => {
        emit('toggle-visited', isVisited.value)

        if (isVisited.value) {
            emit('mark-as-visited')
        } else {
            emit('remove-from-visited')
        }
    }
</script>