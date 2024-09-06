<template>
    <div v-if="showMode === 'latest'">
        <l-marker ref="lmarker"
            :latLng="[equipmentData.positionHistory[0].lat, equipmentData.positionHistory[0].lon]"
            @click="markerClicked" :icon="icon2">
            <l-tooltip>
                <CustomToolTip :data="equipmentData"/>
            </l-tooltip>
        </l-marker>
    </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from 'vue'

const { equipmentData, showMode, icon2 } = defineProps(['equipmentData', 'showMode', 'icon2']);
import { useIcons } from '~/composables/useIcons.js'
const emit = defineEmits(['markerClicked'])

const markerClicked = () => {
    console.log(equipmentData)
    emit('markerClicked', equipmentData.equipment.id)
}

</script>


<style scoped></style>