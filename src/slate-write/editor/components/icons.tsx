import { cva } from 'class-variance-authority';

export const iconVariants = cva('', {
  variants: {
    variant: {
      toolbar: 'h-5 w-5',
      menuItem: 'mr-2 h-5 w-5',
    },
    size: {
      sm: 'mr-2 h-4 w-4',
      md: 'mr-2 h-6 w-6',
    },
  },
  defaultVariants: {},
});
