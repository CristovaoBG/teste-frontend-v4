<template>
    <ClientOnly fallback="Loading Map...">
        <v-app theme="light">
            <MapComponent :zoom="zoom">
                <template #LMarkers>
                    <LatestPositionsMarkers />
                </template>
            </MapComponent>
        </v-app>
    </ClientOnly>>
</template>

<script setup>
import { ref } from "vue";


const zoom = ref(8);
</script>