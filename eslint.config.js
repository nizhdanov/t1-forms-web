import { eslint } from '@nizhdanov/eslint';

export default eslint(
  { typescript: true, react: true, ignores: ['src/**/*.gen.ts'] },
  {
    files: ['src/shared/ui/**/*.{ts,tsx}'],
    rules: {
      'react/no-context-provider': 'off'
    }
  }
);
