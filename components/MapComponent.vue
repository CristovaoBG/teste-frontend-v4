<template>
  <LMap
    style="height: 100vh; width: 100vw; margin: 0; padding: 0;"
    :zoom="10"
    :center="[-19.189985 , -45.99631]"
    :use-global-leaflet="true"
  >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <slot name="LMarkers"></slot>
  </LMap>
</template>

<script setup>
</script>
