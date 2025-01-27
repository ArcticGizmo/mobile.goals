import { SelectableIcon } from '@/components/inputs/iconSelectOptions';
import { useGoals } from '@/composables/goals';
import { generateId } from '@/composables/identifier';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

export const useCreateMilestoneForm = () => {
  const { add } = useGoals();

  const schema = yup.object({
    name: yup.string().required().label('Name'),
    icon: yup.string<SelectableIcon>().optional().label('Icon'),
    targets: yup.array<number[]>().required().min(1).label('Targets')
  });

  type CreateMilestoneGoalForm = yup.InferType<typeof schema>;

  const form = useForm<CreateMilestoneGoalForm>({
    validationSchema: schema,
    validateOnMount: false,
    initialValues: {
      icon: 'star',
      targets: [1,2,3,4,5,6,7,8,9,10,10,12,13]
    }
  });

  const create = async (values: CreateMilestoneGoalForm) => {
    add({
      id: generateId(),
      type: 'milestone',
      name: values.name,
      icon: values.icon,
      targets: [...new Set(values.targets)],
      records: []
    });
  };

  return { create, form };
};
