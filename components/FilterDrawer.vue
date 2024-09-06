<template>
  <div>
    <v-text-field label="Filtrar Por Nome" v-model="textValue" @input="updateFilter"></v-text-field>
  </div>
</template>

<script setup>
const store = useEquipmentStore();
const textValue = ref("")
await store.fetchData()

const updateFilter = () => {
  store.setNameFilter(textValue.value)
}
</script>

<style scoped>
/* Adicione estilos aqui, se necessário */
</style>