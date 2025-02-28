<script setup lang="ts">
    const emit = defineEmits<{
        (e: 'update', files: any[]): void
    }>()


    const {handleFileInput, files} = useFileStorage()

    const handleInput = async (event: any) => {
        await handleFileInput(event)

        emit('update', files.value)
    }




</script>

<template >
    <div>
        <input type="file" multiple @input="handleInput">

    </div>
</template>