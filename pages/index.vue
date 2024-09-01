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
                    <v-col cols="12">
                        <v-btn block class="full-width font-weight-bold" density="comfortable" @click="handleMovimentationClicked">Movimentação</v-btn>
                    </v-col>
                    <v-col cols="12">
                        <v-btn block class="full-width font-weight-bold" density="comfortable" @click="handleDetailsClicked">Detalhes</v-btn>
                    </v-col>
                </v-list>
                <CustomDrawer :activeEquipment="activeEquipment"/>
            </v-navigation-drawer>
            <DetailsComponent2 :dialog="detailsDialog" :equipmentId="activeEquipment" @closeDialog="detailsDialog=false"/>
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
const activeEquipment = ref(null)
const detailsDialog = ref(false)

const handleMovimentationClicked = () => {
    console.log("clicou em mov")
}

const handleDetailsClicked = () => {
    console.log("clicou em det")
    detailsDialog.value = true
}

const handleMarkerClicked = (id) => {
    dr.value = !dr.value
    activeEquipment.value = id
}

</script>