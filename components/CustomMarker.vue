<template>
    <div v-if="showMode === 'latest'">
        <l-marker ref="lmarker" 
        :latLng="[equipmentData.value.positionHistory[0].lat, equipmentData.value.positionHistory[0].lon]"        
        >
            <l-tooltip>
                asd
            </l-tooltip>
        </l-marker>
    </div>
    <div v-else-if="showMode === equipmentData.value.equipment.id">
        <div v-for="equipmentPos in equipmentData.value.positionHistory">
            <l-marker ref="lmarker"
            :latLng="[equipmentPos.lat, equipmentPos.lon]"
            >
                <l-tooltip>
                    {{ equipmentData.value.equipment.id }}
                </l-tooltip>
            </l-marker>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, onMounted  } from 'vue'

// id,
// equipmentModelId,
// equipmentName,
// modelName,
// hourlyEarnings,
// date,
// lat,
// long 


const {equipmentData, showMode} = defineProps(['equipmentData', 'showMode']);

const emit = defineEmits(['meuEvento'])

const markerclicked = () => {
    emit('meuEvento', 'argumento1')
}

onMounted(() => {console.log(equipmentData.value.isActive);console.log('ok')})


</script>


<style scoped>
</style>