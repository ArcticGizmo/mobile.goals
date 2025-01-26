import { SelectableIcon } from '@/components/inputs/iconSelectOptions';
import { MilestoneGoal, useGoals } from '@/composables/goals';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

export const useEditMilestoneForm = () => {
  const { replace, remove: removeGoal } = useGoals();

  const schema = yup.object({
    id: yup.string().required(),
    name: yup.string().required().label('Name'),
    icon: yup.string<SelectableIcon>().optional().label('Icon'),
    targets: yup.array<number[]>().required().min(1).label('Targets'),
    records: yup.array<string[]>().required().label('Records')
  });

  type EditMilestoneGoalForm = yup.InferType<typeof schema>;

  const form = useForm<EditMilestoneGoalForm>({
    validationSchema: schema,
    validateOnMount: false
  });

  const initialise = (goal: MilestoneGoal) => {
    form.setValues({
      id: goal.id,
      name: goal.name,
      icon: goal.icon,
      targets: goal.targets,
      records: goal.records
    });
  };

  const update = async (values: EditMilestoneGoalForm) => {
    await replace({
      id: values.id,
      type: 'milestone',
      name: values.name,
      icon: values.icon,
      targets: values.targets,
      records: values.records
    });
  };

  const remove = async () => {
    await removeGoal(form.values.id);
  };

  return { update, form, initialise, remove };
};
