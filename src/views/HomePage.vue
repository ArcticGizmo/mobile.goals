<template>
  <BasePage max-width="500px">
    <template #header>
      <IonSearchbar class="px-2 my-0.5" v-model="search" />
      <div class="mx-2 mb-1">
        <FilterItem :icon="star" text="Completed" :model-value="filter === 'complete'" @click="toggleFilter('complete')" />
        <FilterItem :icon="starEmpty" text="Incomplete" :model-value="filter === 'incomplete'" @click="toggleFilter('incomplete')" />
      </div>
    </template>
    <div v-for="goal in filteredGoals" :key="goal.id">
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
    <div v-if="!goals.length" class="mt-10 text-center">
      <IonButton class="mt-4" @click="onCreate()">Create your first goal!</IonButton>
    </div>
    <div v-else-if="!filteredGoals.length" class="p-4 mt-10 text-center">
      <div>No matches found.</div>
      <IonButton class="mt-4" fill="outline" @click="onResetFilters()">Clear filters</IonButton>
    </div>

    <div class="fixed bottom-2 right-2">
      <IonFabButton @click="onCreate()">
        <IonIcon :icon="add" />
      </IonFabButton>
    </div>
    <!-- bottom padding for scroll -->
    <div style="height: 2rem"></div>
  </BasePage>
</template>

<script setup lang="ts">
import { Goal, MilestoneGoal, SimpleGoal, useGoals } from '@/composables/goals';
import BasePage from './BasePage.vue';
import { actionSheetController, alertController, IonButton, IonFabButton, IonIcon, IonSearchbar } from '@ionic/vue';
import { computed, ref } from 'vue';
import SimpleGoalCard from '@/components/SimpleGoalCard.vue';
import MilestoneGoalCard from '@/components/MilestoneGoalCard.vue';
import { createDateOnly } from '@/composables/dateOnly';
import { createFullscreenModal } from '@/composables/modal';
import CreateModal from '@/features/create/CreateModal.vue';
import EditMilestoneGoalModal from '@/features/edit/EditMilestoneGoalModal.vue';
import EditSimpleGoalModal from '@/features/edit/EditSimpleGoalModal.vue';
import { sort } from '@/composables/sort';
import FilterItem from '@/components/FilterItem.vue';
import { starEmpty, add, star } from '@/icons';

type Filter = 'complete' | 'incomplete';

const { goals, remove } = useGoals();
const search = ref('');

const filter = ref<Filter>();
const toggleFilter = (value: Filter) => {
  if (filter.value === value) {
    filter.value = undefined;
  } else {
    filter.value = value;
  }
};

const onResetFilters = () => {
  search.value = '';
  filter.value = undefined;
};

const isGoalComplete = (goal: Goal) => {
  if (goal.type === 'simple') {
    return !!goal.completedAt;
  }

  if (goal.type === 'milestone') {
    const biggestTarget = Math.max(...goal.targets);
    return goal.records.length >= biggestTarget;
  }

  console.error('unknown goal type', goal);
  return false;
};

const filteredGoals = computed(() => {
  const items = goals.value.filter(x => {
    const isComplete = isGoalComplete(x);
    switch (filter.value) {
      case 'complete':
        return isComplete;
      case 'incomplete':
        return !isComplete;
      default:
        return true;
    }
  });

  return sort(items, 'name', search.value);
});

const confirmDelete = async (id: string) => {
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
          await remove(id);
        }
      }
    ]
  });
  alert.present();
  await alert.onWillDismiss();
};

const onComplete = (goal: SimpleGoal) => {
  goal.completedAt = createDateOnly();
};
const onUncomplete = (goal: SimpleGoal) => {
  goal.completedAt = undefined;
};
const onEditSimpleGoal = async (goal: SimpleGoal) => {
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
    await confirmDelete(goal.id);
    return;
  }

  if (resp.data === 'edit') {
    const modal = await createFullscreenModal({
      component: EditSimpleGoalModal,
      componentProps: { initial: goal }
    });
    modal.present();

    await modal.onWillDismiss();
    return;
  }
};

const onAddRecord = (goal: MilestoneGoal) => {
  goal.records.push(createDateOnly());
};
const onRemoveRecord = (goal: MilestoneGoal) => {
  goal.records.pop();
};

const onCreate = async () => {
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
    await confirmDelete(goal.id);
    return;
  }

  if (resp.data === 'edit') {
    const modal = await createFullscreenModal({
      component: EditMilestoneGoalModal,
      componentProps: { initial: goal }
    });
    modal.present();

    await modal.onWillDismiss();
    return;
  }
};
</script>

<style scoped>
.increment {
  font-size: 4rem;
  height: 1rem;
}
</style>
