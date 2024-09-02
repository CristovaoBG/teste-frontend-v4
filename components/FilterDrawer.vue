<template>
    <div>
      <v-text-field label="Label" v-model="textValue" @input="updateFilter"></v-text-field>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useUtils } from '~/composables/useUtils.js'
  
  const utils = await useUtils()

  const textValue = ref("Har")
  
  const updateFilter = () => {
      utils.setNameFilter(textValue.value)
  }
  </script>
  
  <style scoped>
  /* Adicione estilos aqui, se necessário */
  </style>
  