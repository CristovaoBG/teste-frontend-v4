<template>
    <div class="text-center pa-4">
        <v-dialog
        v-model="props.dialog"
        width="auto"
        >
        <v-card
            max-width="400"
            prepend-icon="mdi-information"
            text="Your application will relaunch automatically after the update is complete."
            title="Update in progress"
        >
            <template v-slot:actions>
            <v-btn
                class="ms-auto"
                text="Ok"
                @click="emit('closeDialog')"
            ></v-btn>
            </template>
        </v-card>
        </v-dialog>
    </div>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['dialog', 'equipmentId']);
const emit = defineEmits(['closeDialog'])



</script>