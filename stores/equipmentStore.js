import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'

export const useEquipmentStore = defineStore('equipment', () => {
    const equipment = ref(null)
    const equipmentModel = ref(null)
    const equipmentPosHist = ref(null)
    const equipmentState = ref(null)
    const equipmentStateHist = ref(null)
    const everyEquipmentEver = reactive([])
    const nameFilter = ref("")
    const loaded = ref(false)

    async function fetchData() {
        if (loaded.value) return
        loaded.value = true;
        try {
            const [
                equipmentData,
                equipmentModelData,
                equipmentPosHistData,
                equipmentStateData,
                equipmentStateHistData
            ] = await Promise.all([
                $fetch('/equipment.json'),
                $fetch('/equipmentModel.json'),
                $fetch('/equipmentPositionHistory.json'),
                $fetch('/equipmentState.json'),
                $fetch('/equipmentStateHistory.json')
            ]);
            equipment.value = equipmentData;
            equipmentModel.value = equipmentModelData;
            equipmentPosHist.value = equipmentPosHistData;
            equipmentState.value = equipmentStateData;
            equipmentStateHist.value = equipmentStateHistData;

            buildEveryEquipmentEver();
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    function getStateFromId(target) {
        const targetId = target.equipmentStateId
        const result = equipmentState.value.find(item => item.id === targetId)
        return reactive({
            ...result,
            date: ref(target.date)
        })
    }

    function getPositionHistory(targetId) {
        const result = equipmentPosHist.value.find(item => item.equipmentId === targetId)
        return result.positions.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
    }

    function getStateHistory(targetId) {
        const result = equipmentStateHist.value.find(item => item.equipmentId === targetId)
        return result.states.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
    }

    function getLatestPositions(targetId) {
        return getPositionHistory(targetId)[0]
    }

    function buildEveryEquipmentEver() {
        equipment.value.forEach(eq => {
            everyEquipmentEver.push({
                equipment: eq,
                equipmentModel: equipmentModel.value.filter(model => model.id === eq.equipmentModelId)[0],
                positionHistory: getPositionHistory(eq.id),
                stateHistory: getStateHistory(eq.id),
            })
        })
    }

    const filteredEquipments = computed(() => {
        const test = nameFilter.value.toLowerCase()
        const filtered = everyEquipmentEver.filter(item =>
            item.equipmentModel.name.toLowerCase().startsWith(test)
        )
        console.log(filtered)
        return filtered
    })

    function getEquipment(idTarget) {
        return everyEquipmentEver.filter(item => item.equipment.id === idTarget)[0]
    }

    function setNameFilter(name) {
        nameFilter.value = name
    }

    return {
        equipment,
        equipmentModel,
        equipmentPosHist,
        equipmentState,
        equipmentStateHist,
        fetchData,
        getPositionHistory,
        getLatestPositions,
        getStateFromId,
        getStateHistory,
        filteredEquipments,
        everyEquipmentEver,
        setNameFilter,
        getEquipment
    }
})