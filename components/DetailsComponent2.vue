<template>
        <v-dialog
            v-model="props.dialog"
            width="auto"
        >
            <v-card
                max-width="400"
                prepend-icon="mdi-information"
                title="Informações adicionais"
            >
                <v-container>
                    <v-row class="d-flex justify-content-between align-items-center">
                        <v-col class="text-start">Rendimento:</v-col>
                        <v-col class="text-end">{{ stateHist.performance }} %</v-col>
                    </v-row>
                    <v-row class="d-flex justify-content-between align-items-center">
                        <v-col class="text-start">Lucro Total:</v-col>
                        <v-col class="text-end">{{ stateHist.money }}</v-col>
                    </v-row>
                </v-container>
                <template v-slot:actions>
                    <v-row class="d-flex justify-center">
                        <v-btn
                            text="Ok"
                            @click="emit('closeDialog')"
                        ></v-btn>
                    </v-row>
                </template>
            </v-card>
        </v-dialog>
</template>



<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { useUtils } from '/composables/useUtils.js'

const { getStateHistory, equipmentModel, equipment, getEquipment } = await useUtils()

const props = defineProps(['dialog', 'equipmentId']);
const emit = defineEmits(['closeDialog'])

const stateHist = computed(() => {
    const msToHour = (ms) => {
        return ms/(1000*60*60)
    }
    const strToDate = (d) => {
        return new Date(d)
    }
    const everyState = getStateHistory(props.equipmentId)
    // ultimo menos o primeiro
    const totalTime = strToDate(everyState.at(0).date) - strToDate(everyState.at(-1).date)
    // varre tudo somando o tempo de quando esteve em operacao
    let workingTime = 0
    for (var i=0; i < everyState.length - 1; i++){
        if ( everyState[i].equipmentStateId === "0808344c-454b-4c36-89e8-d7687e692d57"){
            workingTime += strToDate(everyState[i].date) - strToDate(everyState[i+1].date)
        }
    }
    const performancePercentage = (100*workingTime/totalTime).toFixed(1)
    // calculo do lucro
    // pega modelo do equipamento
    let money = 0
    for (var i=0; i < everyState.length - 1; i++){
        const eq = getEquipment(props.equipmentId)
        let currentStateId = everyState[i].equipmentStateId
        let price = eq.equipmentModel.hourlyEarnings.find(item => item.equipmentStateId === currentStateId).value
        // procurar onde bate 'id' e 'equipmentStateId' em equipmentModel
        let time = msToHour(strToDate(everyState[i].date) - strToDate(everyState[i+1].date))
        money += time*price
    }
    money = money.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    return {'performance': performancePercentage, 'money': money}
})

// return date.toLocaleDateString('pt-BR', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: false
//     }).replace(':', 'h');

</script>