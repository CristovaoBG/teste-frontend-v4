<template>
    <div>
        <!-- <LMarker :lat-lng="[47.21322, -1.559482]" :icon="customIcon2">
            <LPopup>
                <span>Este é o meu marcador!</span>
            </LPopup>
        </LMarker> -->
        <!-- Adiciona o marcador no mapa -->
        <CustomMarker
        v-for="asd in everyEquipmentEver"
        :equipmentData="asd"
        :showMode="showMode"
        />

    </div>
</template>

<script setup>
import L from 'leaflet'
import { ref, onMounted, computed } from 'vue'
import { useFetch } from '#app'
import { useUtils } from '~/composables/useUtils.js'
import { useIcons } from '~/composables/useIcons.js'

const { equipment, getPositionHistory, everyEquipmentEver } = await useUtils();
const { icons } = useIcons();

const showMode = ref("a7c53eb1-4f5e-4eba-9764-ad205d0891f9")

const equipmentIdList = equipment.value.map(item => item.id)

//////


</script>

<style scoped></style>