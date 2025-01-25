<template>
  <BasePage title="Edit Goal" closable @close="onClose()">
    <div class="p-4">
      <div class="flex">
        <IconInput name="icon" />
        <TextInput class="mt-2 ml-4" name="name" label="Name" />
      </div>

      <TargetsInput class="mt-4" name="targets" label="Your Targets" />

      <IonButton class="fixed bottom-0 w-full pr-8" @click="onUpdate()">Update</IonButton>
    </div></BasePage
  >
</template>

<script setup lang="ts">
import IconInput from '@/components/inputs/IconInput.vue';
import TargetsInput from '@/components/inputs/TargetsInput.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import BasePage from '@/views/BasePage.vue';
import { IonButton, modalController } from '@ionic/vue';
import { useEditMilestoneForm } from './editMilestoneForm';
import { MilestoneGoal } from '@/composables/goals';
import { onMounted } from 'vue';

const props = defineProps<{ initial: MilestoneGoal }>();

onMounted(() => {
  initialise(props.initial);
});

const { initialise, form, update } = useEditMilestoneForm();

const onClose = () => modalController.dismiss();

const onUpdate = form.handleSubmit(async values => {
  await update(values);
  onClose();
});
</script>
