import { ComputedRef, readonly, ref, watch } from 'vue';
import { useKvStore } from './kvStore';
import { SelectableIcon } from '@/components/inputs/iconSelectOptions';

export type GoalDifficulty = 'easy' | 'medium' | 'hard';

interface BaseGoal {
  id: string;
  name: string;
  icon?: SelectableIcon;
  difficulty?: GoalDifficulty;
}

export interface MilestoneGoal extends BaseGoal {
  type: 'milestone';
  targets: number[];
  records: string[];
}

export interface SimpleGoal extends BaseGoal {
  type: 'simple';
  completedAt?: string;
}

export type Goal = MilestoneGoal | SimpleGoal;
export type GoalType = Goal['type'];

const GOAL_KEY = 'goals';

const kvStore = useKvStore();

const goals = ref<Goal[]>([]);
const loading = ref(false);

watch(
  goals,
  async g => {
    console.debug('[goals] saving to disk');
    await kvStore.saveJson<Goal[]>(GOAL_KEY, g);
  },
  { deep: true }
);

const initialLoad = async () => {
  loading.value = true;
  try {
    const data = await kvStore.loadJson<Goal[]>(GOAL_KEY);
    goals.value = data || [];
  } catch (err) {
    console.error('unable to load goals', err);
  } finally {
    loading.value = false;
  }
};

const add = async (goal: Goal) => {
  const updatedGoals = goals.value.filter(x => x.id !== goal.id);
  updatedGoals.push(goal);
  goals.value = updatedGoals;
};

const remove = async (id: string) => {
  goals.value = goals.value.filter(x => x.id !== id);
};

const set = async (newGoals: Goal[]) => {
  goals.value = [...newGoals];
};

const replace = async (goal: Goal) => {
  const index = goals.value.findIndex(x => x.id === goal.id);

  if (index > -1) {
    goals.value[index] = goal;
  }
};

/* load on app start because this is all the app does */
initialLoad();

export const useGoals = () => {
  const clear = () => set([]);

  return { goals: readonly(goals) as ComputedRef<Goal[]>, add, remove, set, clear, replace, loading };
};
