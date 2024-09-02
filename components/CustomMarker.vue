<template>
    <div v-if="showMode === 'latest'">
        <l-marker ref="lmarker"
            :latLng="[equipmentData.positionHistory[0].lat, equipmentData.positionHistory[0].lon]"
            @click="markerClicked" :icon="icon">
            <l-tooltip>
                <CustomToolTip :data="equipmentData"/>
            </l-tooltip>
        </l-marker>
        <!-- <l-tooltip>
                <CustomToolTip
                :data="getStateFromId(equipmentData.value.stateHistory[0]) "/>
            </l-tooltip>
        </l-marker> -->
    </div>
    <!-- <div v-else-if="showMode === equipmentData.value.equipment.id">
        <div v-for="equipmentPos in equipmentData.value.positionHistory">
            <l-marker ref="lmarker"
            :latLng="[equipmentPos.lat, equipmentPos.lon]"
            @click="markerUnclicked"
            >
                <l-tooltip>
                    {{ equipmentData.value.equipment.id }}
                </l-tooltip>
                
            </l-marker>
        </div>
    </div> -->
</template>

<script setup>
import { ref, defineEmits, onMounted } from 'vue'

const { equipmentData, showMode } = defineProps(['equipmentData', 'showMode']);
import { useIcons } from '~/composables/useIcons.js'
import { useUtils } from '~/composables/useUtils.js'

const { harvesterIcon, caminhao, garra, divIcon } = useIcons();

const emit = defineEmits(['markerClicked'])

const icon = ref();

onMounted(() => {
    if (equipmentData.equipmentModel.name === "Caminhão de carga") {
        icon.value = caminhao
    }
    else if (equipmentData.equipmentModel.name === "Harvester") {
        icon.value = harvesterIcon
    }
    else if (equipmentData.equipmentModel.name === "Garra traçadora") {
        icon.value = garra
    }
})

const markerClicked = () => {
    emit('markerClicked', equipmentData.equipment.id)
}

const markerUnclicked = () => {
    emit('markerClicked', 'latest')
}

</script>


<style scoped></style>