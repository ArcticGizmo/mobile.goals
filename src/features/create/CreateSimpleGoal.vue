<template>
  <TextInput name="name" label="Name" />
  <pre>{{ form.values }}</pre>
  <pre>{{ form.errors }}</pre>
</template>

<script setup lang="ts">
import { useCreateSimpleForm } from './createSimpleForm';
import TextInput from '@/components/inputs/TextInput.vue';

const { create, form } = useCreateSimpleForm();
</script>
