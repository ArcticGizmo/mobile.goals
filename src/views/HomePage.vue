<template>
  <BasePage title="Home" max-width="500px">
    <template #header>
      <IonSearchbar class="px-2 my-0.5" v-model="search" />
    </template>
    <IonCard v-for="goal of items" :key="goal.id">
      <IonCardHeader>
        <IonLabel>{{ goal.count }} / {{ goal.maxTarget }}</IonLabel>
        <IonLabel class="text-2xl" color="medium">
          {{ goal.name }}
        </IonLabel>
      </IonCardHeader>
      <IonCardContent>
        <div class="flex -ml-3">
          <MilestoneIcon count="2" complete />
          <MilestoneIcon count="2000" />
        </div>
        <div class="flex justify-end w-full">
          <IonButton class="w-16" size="large" fill="clear">
            <IonIcon slot="icon-only" :icon="minus" color="danger" />
          </IonButton>
          <IonButton class="w-16" size="large" color="secondary">
            <IonIcon slot="icon-only" :icon="plus" />
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  </BasePage>
</template>

<script setup lang="ts">
import { useGoals } from '@/composables/goals';
import BasePage from './BasePage.vue';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonIcon, IonLabel, IonSearchbar } from '@ionic/vue';
import { computed, ref } from 'vue';
import MilestoneIcon from '@/components/MilestoneIcon.vue';
import { minus, plus } from '@/icons';

const { goals } = useGoals();
const search = ref('');

const items = computed(() => {
  return goals.value.map(g => {
    const count = g.records.length;
    const maxTarget = Math.max(...g.targets);
    return {
      id: g.id,
      icon: g.icon,
      name: g.name,
      count,
      maxTarget
    };
  });
});
</script>

<style scoped>
.increment {
  font-size: 4rem;
  height: 1rem;
}
</style>
