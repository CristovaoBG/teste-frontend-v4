<template>
    <ClientOnly fallback="Loading Map...">
    <v-card>
        <v-layout>
            <v-navigation-drawer v-model="dr" temporary>
                <v-list-item>
                    <v-container>
                        <v-img src="public/aiko.png"/>
                    </v-container>
                </v-list-item>
                <v-divider></v-divider>
                <v-list density="compact" nav>
                    <v-list-item title="Home" value="home"></v-list-item>
                    <v-list-item title="About" value="about"></v-list-item>
                </v-list>
                <CustomDrawer :activeEquipment="activeEquipment"/>
            </v-navigation-drawer>
            <!-- MAPA -->
            <v-main style="height: 100vh">
                <v-app theme="light">
                    <MapComponent :zoom="11">
                        <template #LMarkers>
                            <LatestPositionsMarkers @markerClicked="handleMarkerClicked"/>
                        </template>
                    </MapComponent>
                </v-app>
                </v-main>
            </v-layout>
        </v-card>
    </ClientOnly>
</template>

<script setup>
import { ref } from 'vue'

const dr = ref(false)
const activeEquipment = ref('asd')

const handleMarkerClicked = (id) => {
    dr.value = !dr.value
    activeEquipment.value = id
}

</script>