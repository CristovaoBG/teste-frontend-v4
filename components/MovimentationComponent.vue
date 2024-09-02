<!-- TODO: mudar nome desse componente -->
<template>
    <div>
    <LPolyline
        :lat-lngs="history"
        color="green"
        opacity=0.5
    />
    <LMarker 
    v-for="item in historyAndTimes" :key="item"

    :lat-lng="[item.lat, item.lon]" 
    :icon="getIcon(formatDate(item.date))" />

    </div>
</template>

<script setup>
import L from 'leaflet'
import { ref, defineProps, computed } from 'vue'
import { useUtils } from '~/composables/useUtils.js'

const utils = await useUtils();

const props = defineProps(['equipmentId'])


const historyAndTimes = computed(() => {
    return utils.getPositionHistory(props.equipmentId)
})

const history = computed(() => {
      const positions = utils.getPositionHistory(props.equipmentId)
      if (!positions) return []
      return  positions.map(position => [position.lat, position.lon]);
})

const getIcon = (t) => {
    const text = `${t}`; // você pode personalizar o texto aqui
    const icon = new L.DivIcon({
      html: `
        <div style="display: inline-block; text-align: center;">
          <div style="font-size: 12px; color: black; margin-bottom: 2px; vertical-align: middle;">${t}</div>
          <div style="width: 12px; height: 12px; background-color: #2596be; border-radius: 50%; display: inline-block; vertical-align: middle;"></div>
        </div>
      `,
      className: '',
      iconAnchor: [30, 50]
    });
    return icon;
  };

const formatDate = (d) => {
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

<style scoped></style>