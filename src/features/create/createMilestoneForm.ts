import { SelectableIcon } from '@/components/inputs/iconSelectOptions';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

export const useCreateMilestoneForm = () => {
  const schema = yup.object({
    type: yup.string<'milestone'>(),
    name: yup.string().required().label('Name'),
    icon: yup.string<SelectableIcon>().optional().label('Icon'),
    targets: yup.array<number[]>().required().min(1).label('Target')
  });

  type CreateGoalForm = yup.InferType<typeof schema>;

  const form = useForm<CreateGoalForm>({
    validationSchema: schema
  });

  const create = form.handleSubmit(values => {
    // save some stuff or something
    console.dir(values);
  });

  return { create, form };
};
