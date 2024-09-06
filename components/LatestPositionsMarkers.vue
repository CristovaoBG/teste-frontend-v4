<!-- TODO: mudar nome desse componente -->
<template>
    <div>
        <CustomMarker
        v-for="(equipment, id) in store.filteredEquipments" :key="id"
        :equipmentData="equipment"
        :showMode="showMode"
        :icon2="getIcon(equipment)"
        @markerClicked="handleNotify"
        />
    </div>
</template>

<script setup>
import { useEquipmentStore } from '~/stores/equipmentStore'

const { harvesterIcon, caminhao, garra, divIcon } = useIcons();
const store = useEquipmentStore();
await store.fetchData()

const getIcon = (eq) => {
    if (eq.equipmentModel.name === "Caminhão de carga") {
        return caminhao
    }
    else if (eq.equipmentModel.name === "Harvester") {
        return harvesterIcon
    }
    else if (eq.equipmentModel.name === "Garra traçadora") {
        return garra
    }
    else return null
}

const showMode = ref("latest")

const emit = defineEmits(['markerClicked'])

const handleNotify = (id) => {
    //showMode.value = id
    emit('markerClicked', id)
}


</script>

<style scoped></style>