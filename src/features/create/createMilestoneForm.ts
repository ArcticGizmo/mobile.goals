import { SelectableIcon } from '@/components/inputs/iconSelectOptions';
import { GoalDifficulty, useGoals } from '@/composables/goals';
import { generateId } from '@/composables/identifier';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

export const useCreateMilestoneForm = () => {
  const { add } = useGoals();

  const schema = yup.object({
    name: yup.string().required().label('Name'),
    icon: yup.string<SelectableIcon>().optional().label('Icon'),
    targets: yup.array<number[]>().required().min(1).label('Targets'),
    difficulty: yup.string<GoalDifficulty>().optional().label('Difficulty')
  });

  type CreateMilestoneGoalForm = yup.InferType<typeof schema>;

  const form = useForm<CreateMilestoneGoalForm>({
    validationSchema: schema,
    validateOnMount: false,
    initialValues: {
      icon: 'star',
      targets: [],
      difficulty: 'easy'
    }
  });

  const create = async (values: CreateMilestoneGoalForm) => {
    add({
      id: generateId(),
      type: 'milestone',
      name: values.name,
      icon: values.icon,
      difficulty: values.difficulty,
      targets: [...new Set(values.targets)],
      records: []
    });
  };

  return { create, form };
};
