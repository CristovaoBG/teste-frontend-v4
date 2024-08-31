<template>
    <div>
        {{ activeEquipment }}
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'

const { activeEquipment } = defineProps(['activeEquipment'])


onMounted(() => {console.log(activeEquipment)})

</script>

<style scoped>

</style>