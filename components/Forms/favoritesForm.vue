<template>
    <div>
        <input
            type="checkbox"
            v-model="isFavorite"
            @change="handleInput"
        >
        <Icon name="mdi:bookmark-outline" />
        <Icon name="mdi:bookmark" />
    </div>
</template>

<script setup lang="ts">
    // const isFavorite = ref(false)

    const isFavorite = defineModel({
        default: false,
    })

    const emit = defineEmits<{
        (e: 'mark-as-favorite'):void
        (e: 'remove-from-favorite'):void
        (e: 'toggle-favorite', isFavorite: boolean): void
    }>()

    const handleInput = () => {
        emit('toggle-favorite', isFavorite.value)

        if (isFavorite.value) {
            emit('mark-as-favorite')
        } else {
            emit('remove-from-favorite')
        }
    }
</script>