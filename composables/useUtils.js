import { ref, reactive } from 'vue'

export async function useUtils() {

    const equipment = ref(null)
    const equipmentModel = ref(null)
    const equipmentPosHist = ref(null)
    const equipmentState = ref(null)
    const equipmentStateHist = ref(null)

    const everyEquipmentEver = ref([])
  
    try {
        equipment.value = await $fetch('/equipment.json')
        equipmentModel.value = await $fetch('/equipmentModel.json')
        equipmentPosHist.value = await $fetch('/equipmentPositionHistory.json')
        equipmentState.value = await $fetch('/equipmentState.json')
        equipmentStateHist.value = await $fetch('/equipmentStateHistory.json')
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
        everyEquipmentEver.value.push(ref({
            equipment: eq,
            equipmentModel: equipmentModel.value.filter(model => model.id === eq.equipmentModelId)[0],
            positionHistory: getPositionHistory(eq.id),
            stateHistory: getStateHistory(eq.id),
        }))
    })

    const getEquipment = (targetId) => {
        return everyEquipmentEver.value.find(item => item.value.equipment.id === targetId)
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
        getEquipment,
        getStateHistory,
        everyEquipmentEver,
    }

}