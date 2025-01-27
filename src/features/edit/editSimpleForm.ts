import { SelectableIcon } from '@/components/inputs/iconSelectOptions';
import { createDateOnly } from '@/composables/dateOnly';
import { GoalDifficulty, SimpleGoal, useGoals } from '@/composables/goals';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import * as yup from 'yup';

export const useEditSimpleForm = () => {
  const { replace, remove: removeGoal } = useGoals();

  const initialCompletedAt = ref<string>();

  const schema = yup.object({
    id: yup.string().required(),
    name: yup.string().required().label('Name'),
    icon: yup.string<SelectableIcon>().optional().label('Icon'),
    completed: yup.boolean(),
    difficulty: yup.string<GoalDifficulty>().optional().label('Difficulty')
  });

  type EditSimpleGoalForm = yup.InferType<typeof schema>;

  const form = useForm<EditSimpleGoalForm>({
    validationSchema: schema,
    validateOnMount: false
  });

  const initialise = (goal: SimpleGoal) => {
    (initialCompletedAt.value = goal.completedAt),
      form.setValues({
        id: goal.id,
        name: goal.name,
        icon: goal.icon,
        completed: !!goal.completedAt,
        difficulty: goal.difficulty
      });
  };

  const update = async (values: EditSimpleGoalForm) => {
    // we preserve the original completed at if possible
    const completedAt = values.completed ? initialCompletedAt.value || createDateOnly() : undefined;

    await replace({
      id: values.id,
      type: 'simple',
      name: values.name,
      icon: values.icon,
      completedAt,
      difficulty: values.difficulty
    });
  };

  const remove = async () => {
    await removeGoal(form.values.id);
  };

  return { update, form, initialise, remove };
};
