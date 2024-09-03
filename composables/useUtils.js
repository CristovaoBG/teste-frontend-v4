import { ref, reactive, computed } from 'vue'

export async function useUtils() {

    const equipment = ref(null)
    const equipmentModel = ref(null)
    const equipmentPosHist = ref(null)
    const equipmentState = ref(null)
    const equipmentStateHist = ref(null)
    const everyEquipmentEver = reactive([])
    const nameFilter = ref("")

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

    } catch (error) {
        console.error('Error fetching data:', error)
    }

    const getStateFromId = (target) => {
        const targetId = target.equipmentStateId
        const result = equipmentState.value.find(item => item.id === targetId)
        return reactive({
            ...result,
            date: ref(target.date)
        })
    }

    const getPositionHistory = (targetId) => {

        const result = equipmentPosHist.value.find(item => item.equipmentId === targetId)
        // organiza pela data (invertido)
        return result.positions.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
    };

    const getStateHistory = (targetId) => {
        const result = equipmentStateHist.value.find(item => item.equipmentId === targetId)
        // organiza pela data (invertido)
        return result.states.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
    };

    const getLatestPositions = (targetId) => {
        return getPositionHistory(targetId)[0]
    }

    // constroi todos os equipamentos
    equipment.value.forEach(eq => {
        everyEquipmentEver.push({
            equipment: eq,
            equipmentModel: equipmentModel.value.filter(model => model.id === eq.equipmentModelId)[0],
            positionHistory: getPositionHistory(eq.id),
            stateHistory: getStateHistory(eq.id),
        })
    })

    const filteredEquipments = computed(() => {
        const teste = nameFilter.value.toLowerCase()
        console.log("atualizou")
        return everyEquipmentEver.filter(item =>
            item.equipmentModel.name.toLowerCase().startsWith(teste)
        )
    })

    const getEquipment = (idTarget) => {
        return everyEquipmentEver.filter(item => item.equipment.id === idTarget)[0]
    }

    const setNameFilter = (name) => {
        nameFilter.value = name
        console.log(name)
    }

    return {
        equipment,
        equipmentModel,
        equipmentPosHist,
        equipmentState,
        equipmentStateHist,
        getPositionHistory,
        getLatestPositions,
        getStateFromId,
        getStateHistory,
        filteredEquipments,
        everyEquipmentEver,
        setNameFilter,
        getEquipment
    }

}