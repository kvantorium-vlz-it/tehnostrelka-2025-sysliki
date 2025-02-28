<template>
<div>
    <input v-model="text" type="text" placeholder="введите комент">
    <button @click="create">отправить</button>
</div>
</template>

<script setup lang="ts">
    const emit = defineEmits<{ (e:'create-coment', text:string ): void}>()
    const text = ref('')
    function create() {
        emit('create-coment', text.value)
    }

</script>