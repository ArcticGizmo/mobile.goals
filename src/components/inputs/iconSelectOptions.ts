import { airplane, book, cash, chefHat, forest, learn, run, star, ticket, weightLifter } from '@/icons';

export type IconOption = {
  value: string;
  icon: any;
};

export const ICON_OPTIONS = [
  {
    value: 'star',
    icon: star
  },
  {
    value: 'weight-lifter',
    icon: weightLifter
  },
  {
    value: 'cooking',
    icon: chefHat
  },
  {
    value: 'running',
    icon: run
  },
  {
    value: 'learn',
    icon: learn
  },
  {
    value: 'money',
    icon: cash
  },
  {
    value: 'travel',
    icon: airplane
  },
  {
    value: 'book',
    icon: book
  },
  {
    value: 'ticket',
    icon: ticket
  },
  {
    value: 'forest',
    icon: forest
  }
] as const;

export type SelectableIcon = (typeof ICON_OPTIONS)[number]['value'];
