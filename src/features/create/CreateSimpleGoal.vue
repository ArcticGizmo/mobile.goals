<template>
  <div class="flex">
    <IconInput name="icon" />
    <TextInput class="mt-2 ml-4" name="name" label="Name" />
  </div>

  <pre>{{ form.values }}</pre>
  <pre>{{ form.errors }}</pre>

  <IonButton expand="block" @click="onCreate()">Create</IonButton>
</template>

<script setup lang="ts">
import IconInput from '@/components/inputs/IconInput.vue';
import { useCreateSimpleForm } from './createSimpleForm';
import TextInput from '@/components/inputs/TextInput.vue';
import { IonButton, modalController } from '@ionic/vue';

const { create, form } = useCreateSimpleForm();

const onCreate = form.handleSubmit(values => {
  create(values);
  modalController.dismiss();
});
</script>
