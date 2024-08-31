<!-- TODO: mudar nome desse componente -->
<template>
    <div>
        <CustomMarker
        v-for="equipment in everyEquipmentEver"
        :equipmentData="equipment"
        :showMode="showMode"
        @markerClicked="handleNotify"
        />
    </div>
</template>

<script setup>
import L from 'leaflet'
import { ref, onMounted, computed } from 'vue'
import { useFetch } from '#app'
import { useUtils } from '~/composables/useUtils.js'

const { everyEquipmentEver } = await useUtils();

const showMode = ref("latest")

const emit = defineEmits(['markerClicked'])

const handleNotify = (id) => {
    //showMode.value = id
    emit('markerClicked', id)
}


</script>

<style scoped></style>