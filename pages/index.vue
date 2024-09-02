<template>
    <ClientOnly fallback="Loading Map...">
    <v-card>
        <v-layout>
            <!-- botao de fechar movimentacao-->
            <v-fab
                :active="showPositions"
                color="#FF0000"
                class="position-fixed ma-4 v-elevation-24"
                style="z-index: 1000; top: 80px; right: 80px;"
                icon="mdi-close"
                location="top right"
                size="large"
                absolute
                offset
                @click="closeMovimentation"
            />
                        <!-- botao de fechar movimentacao-->
            <v-fab
                :active="!filterDrawer && !showPositions"
                color="#000000"
                class="position-fixed ma-4 v-elevation-24"
                style="z-index: 1000; top: 80px; right: 80px;"
                icon="mdi-filter"
                location="top right"
                size="large"
                absolute
                offset
                @click="toggleFilterDrawer"
            />
            <!-- barra de navegação à direita -->
            <v-navigation-drawer v-model="filterDrawer" temporary location="right">
                <FilterDrawer/>
            </v-navigation-drawer>
            <!-- barra de navegação à esquerda -->
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
                            <LatestPositionsMarkers v-if="!showPositions" @markerClicked="handleMarkerClicked"/>
                            <MovimentationComponent v-if="showPositions"  :equipmentId="activeEquipment"/>
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
const showPositions = ref(false)
const filterDrawer = ref(true)

const handleMovimentationClicked = () => {
    showPositions.value = true
    dr.value = false
}

const handleDetailsClicked = () => {
    detailsDialog.value = true
}

const handleMarkerClicked = (id) => {
    dr.value = !dr.value
    activeEquipment.value = id
}

const closeMovimentation = () => {
    showPositions.value = false
}

const toggleFilterDrawer = () => {
    filterDrawer.value = !filterDrawer.value
}

</script>