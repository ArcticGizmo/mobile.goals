<template>
  <div class="flex">
    <IconInput name="icon" />
    <TextInput class="mt-2 ml-4" name="name" label="Name" autocapitalize="sentences" autocorrect />
  </div>

  <TargetsInput class="mt-4" name="targets" label="Your Targets" />

  <IonButton class="fixed bottom-0 w-full pr-8" @click="onCreate()">Create</IonButton>
</template>

<script setup lang="ts">
import { IonButton, modalController } from '@ionic/vue';
import { useCreateMilestoneForm } from './createMilestoneForm';
import TextInput from '@/components/inputs/TextInput.vue';
import IconInput from '@/components/inputs/IconInput.vue';
import TargetsInput from '@/components/inputs/TargetsInput.vue';

const { create, form } = useCreateMilestoneForm();

const onCreate = form.handleSubmit(async values => {
  await create(values);
  modalController.dismiss();
});
</script>
