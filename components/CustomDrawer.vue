<template>
    <div class="contain">
        <v-timeline align="start" side="end" class="timeline">
            <v-timeline-item :dot-color="item.color" v-for="item in items" :key="item" size="small">
                <div class="d-flex">
                    <div>
                    <strong>{{ item.name }}</strong>
                    <div class="text-caption">
                        {{ date(item.date) }}
                    </div>
                    </div>
                </div>
            </v-timeline-item>
      </v-timeline>
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted, computed } from 'vue'
import { useUtils } from '/composables/useUtils'

const { getStateFromId, getStateHistory } = await useUtils()

const props = defineProps(['activeEquipment'])

const activeEquipmentComputed = computed(() => {
    return props.activeEquipment
})

const items = computed(() => {
    if (!props.activeEquipment) return []
    const eqStateHist = getStateHistory(props.activeEquipment)
    const result = []
    eqStateHist.forEach((item) => {
        result.push(getStateFromId(item))
    })
    return result
})
const date = (d) => {
    if (!d) return ""
    const date = new Date(d)
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).replace(':', 'h');
}
</script>

<style scoped>

.contain {
  overflow-y: auto;
  max-height: 50vh; /* Ajuste a altura conforme necessário */
}

.timeline {
    background-color: #F0F0F0
    }
</style>
