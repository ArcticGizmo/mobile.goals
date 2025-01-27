<template>
  <BasePage title="Edit Goal" closable @close="onClose()">
    <div class="p-4">
      <!-- TODO: add graph/summary up here -->

      <div class="flex">
        <IconInput name="icon" />
        <TextInput class="mt-2 ml-4" name="name" label="Name" autocapitalize="sentences" autocorrect />
      </div>
      <DifficultySelector class="mt-4" name="difficulty" label="Difficulty" />

      <TargetsInput class="mt-4" name="targets" label="Your Targets" />
      <RecordsInput class="mt-4" name="records" label="Your Records" />

      <KeyboardSafeFooter>
        <IonButton class="mb-4" expand="block" @click="onUpdate()">Update</IonButton>
        <IonButton expand="block" fill="outline" color="danger" @click="onDelete()">Delete</IonButton>
      </KeyboardSafeFooter>
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import IconInput from '@/components/inputs/IconInput.vue';
import TargetsInput from '@/components/inputs/TargetsInput.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import BasePage from '@/views/BasePage.vue';
import { alertController, IonButton, modalController } from '@ionic/vue';
import { useEditMilestoneForm } from './editMilestoneForm';
import { MilestoneGoal } from '@/composables/goals';
import { onMounted } from 'vue';
import RecordsInput from '@/components/inputs/RecordsInput.vue';
import KeyboardSafeFooter from '@/components/KeyboardSafeFooter.vue';
import DifficultySelector from '@/components/inputs/DifficultySelector.vue';

const props = defineProps<{ initial: MilestoneGoal }>();

onMounted(() => {
  initialise(props.initial);
});

const { initialise, form, update, remove } = useEditMilestoneForm();

const onClose = () => modalController.dismiss();

const onUpdate = form.handleSubmit(async values => {
  await update(values);
  onClose();
});

const onDelete = async () => {
  const alert = await alertController.create({
    header: 'Delete goal forever?',
    buttons: [
      {
        text: 'cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        role: 'destructive',
        handler: async () => {
          await remove();
          onClose();
        }
      }
    ]
  });
  alert.present();
  await alert.onWillDismiss();
};
</script>
