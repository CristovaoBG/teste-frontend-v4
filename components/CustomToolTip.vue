<template>
    <v-container class="text-center pa-1">
      <v-card 
        :color="getState.color" 
        class="pa-3 mb-3 rounded-lg"
        elevation="4"
      >
        <v-card-title class="text-h4 justify-center">
          {{ getState.name }}
        </v-card-title>
      </v-card>
      
      <v-card-subtitle class="text-subtitle-2 mb-1">
        {{ date }}
      </v-card-subtitle>
      
      <v-card-text class="text-secondary">
        Clique para ver histórico
      </v-card-text>
    </v-container>
  </template>

<script setup>
import { ref, defineProps, computed } from 'vue'

const { getStateFromId } = await useUtils();
const { data } = defineProps(['data']);


const getState = computed(() => { return getStateFromId(data.value.stateHistory[0]) })
const date = computed(() => {
    const date = new Date(getStateFromId(data.value.stateHistory[0]).date)
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).replace(':', 'h');
})


</script>

<style scoped></style>