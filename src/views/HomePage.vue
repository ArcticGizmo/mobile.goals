<template>
  <BasePage title="My Goals" max-width="500px">
    <template #header>
      <IonSearchbar class="px-2 my-0.5" v-model="search" />
    </template>
    <div v-for="goal in goals" :key="goal.id">
      <SimpleGoalCard
        v-if="goal.type === 'simple'"
        :name="goal.name"
        :completed-at="goal.completedAt"
        @complete="onComplete(goal)"
        @uncomplete="onUncomplete(goal)"
        @edit="onEditSimpleGoal(goal)"
      />
      <MilestoneGoalCard
        v-else-if="goal.type === 'milestone'"
        :name="goal.name"
        :targets="goal.targets"
        :count="goal.records.length"
        @add="onAddRecord(goal)"
        @remove="onRemoveRecord(goal)"
        @edit="onEditMilestoneGoal(goal)"
      />
    </div>
    <div class="fixed bottom-2 right-2">
      <IonFabButton @click="onAdd()">
        <IonIcon :icon="add" />
      </IonFabButton>
    </div>
    <!-- bottom padding for scroll -->
    <div style="height: 2rem"></div>
  </BasePage>
</template>

<script setup lang="ts">
import { MilestoneGoal, SimpleGoal, useGoals } from '@/composables/goals';
import BasePage from './BasePage.vue';
import { actionSheetController, IonFabButton, IonIcon, IonSearchbar } from '@ionic/vue';
import { ref } from 'vue';
import SimpleGoalCard from '@/components/SimpleGoalCard.vue';
import MilestoneGoalCard from '@/components/MilestoneGoalCard.vue';
import { createDateOnly } from '@/composables/dateOnly';
import { add } from 'ionicons/icons';
import { createFullscreenModal } from '@/composables/modal';
import CreateModal from '@/features/create/CreateModal.vue';
import EditMilestoneGoalModal from '@/features/edit/EditMilestoneGoalModal.vue';

const { goals, remove } = useGoals();
const search = ref('');

const onComplete = (goal: SimpleGoal) => {
  goal.completedAt = createDateOnly();
};
const onUncomplete = (goal: SimpleGoal) => {
  goal.completedAt = undefined;
};
const onEditSimpleGoal = async (goal: SimpleGoal) => {
  let action;
  if (goal.completedAt) {
    action = { text: 'Mark as uncomplete', data: 'uncomplete' };
  } else {
    action = { text: 'Mark as complete', data: 'complete' };
  }

  const sheet = await actionSheetController.create({
    buttons: [
      action,
      {
        text: 'Delete',
        role: 'destructive',
        data: 'delete'
      },
      {
        text: 'Cancel',
        role: 'cancel',
        data: 'cancel'
      }
    ]
  });

  sheet.present();

  const resp = await sheet.onWillDismiss();

  if (resp.data === 'delete') {
    remove(goal.id);
  }

  if (resp.data === 'uncomplete') {
    goal.completedAt = undefined;
  }

  if (resp.data === 'complete') {
    goal.completedAt = createDateOnly();
  }
};

const onAddRecord = (goal: MilestoneGoal) => {
  goal.records.push(createDateOnly());
};
const onRemoveRecord = (goal: MilestoneGoal) => {
  goal.records.pop();
};

const onAdd = async () => {
  const modal = await createFullscreenModal({
    component: CreateModal
  });
  modal.present();

  await modal.onDidDismiss();
};

const onEditMilestoneGoal = async (goal: MilestoneGoal) => {
  const sheet = await actionSheetController.create({
    buttons: [
      {
        text: 'Edit',
        data: 'edit'
      },
      {
        text: 'Delete',
        role: 'destructive',
        data: 'delete'
      },
      {
        text: 'Cancel',
        role: 'cancel',
        data: 'cancel'
      }
    ]
  });

  sheet.present();

  const resp = await sheet.onWillDismiss();

  if (resp.data === 'delete') {
    remove(goal.id);
  }

  if (resp.data === 'edit') {
    const modal = await createFullscreenModal({
      component: EditMilestoneGoalModal,
      componentProps: { initial: goal }
    });
    modal.present();

    await modal.onWillDismiss();
  }
};
</script>

<style scoped>
.increment {
  font-size: 4rem;
  height: 1rem;
}
</style>
