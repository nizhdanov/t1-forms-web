import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

const phoneRegex = /^(\+7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
const userFormSchema = z.object({
  email: z.email({ error: 'Некорректный email' }).min(1, { error: 'Email обязателен' }),
  birthDate: z.string().refine((val) => {
    const date = new Date(val);
    return !Number.isNaN(date.getTime()) && date.toISOString() === val;
  }, {
    message: 'Некорректная дата'
  }).optional(),
  employment: z.enum(['1', '2', '3']).optional(),
  password: z.string().min(1, { error: 'Пароль обязателен' }),
  fullName: z.string().min(1, { error: 'ФИО обязательно' }).max(130),
  name: z.string().min(1, { error: 'Имя обязательно' }).max(64),
  surName: z.string().min(1, { error: 'Фамилия обязательна' }).max(64),
  telephone: z.string().regex(phoneRegex, {
    message: 'Некорректный номер'
  }).optional(),
  userAgreement: z.boolean().optional()
});

export function UserForm() {
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: undefined,
      birthDate: undefined,
      employment: undefined,
      fullName: undefined,
      name: undefined,
      surName: undefined,
      telephone: undefined,
      userAgreement: undefined
    },
    mode: 'onBlur'
  });

  const onSubmit = (values: z.infer<typeof userFormSchema>) => {
  };

  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <div className='flex flex-col gap-6'>
          <Card>
            <CardContent>
              <Form {...form}>
                <form className='grid gap-6' onSubmit={form.handleSubmit(onSubmit)}>
                  <div className='grid gap-6'>
                    <FormField
                      render={({ field }) => (
                        <FormItem className='grid gap-3'>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type='email'
                              autoComplete='none'
                              placeholder='admin@inno.tech'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      name='email'
                      control={form.control}
                    />

                    <FormField
                      render={({ field }) => (
                        <FormItem className='grid gap-3'>
                          <FormLabel>Пароль</FormLabel>
                          <FormControl>
                            <Input
                              type='password'
                              autoComplete='current-password'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      name='password'
                      control={form.control}
                    />
                  </div>

                  <div className='grid gap-6'>
                    <FormField
                      render={({ field }) => (
                        <FormItem className='grid gap-3'>
                          <FormLabel>Имя</FormLabel>
                          <FormControl>
                            <Input type='text' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      name='name'
                      control={form.control}
                    />

                    <FormField
                      render={({ field }) => (
                        <FormItem className='grid gap-3'>
                          <FormLabel>Фамилия</FormLabel>
                          <FormControl>
                            <Input type='text' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      name='surName'
                      control={form.control}
                    />
                  </div>

                  <FormField
                    render={({ field }) => (
                      <FormItem className='grid gap-3'>
                        <FormLabel>ФИО</FormLabel>
                        <FormControl>
                          <Input type='text' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    name='fullName'
                    control={form.control}
                  />

                  {form.formState.errors.root && (
                    <p className='text-destructive text-sm'>{form.formState.errors.root.message}</p>
                  )}

                  <Button className='w-full' type='submit'>
                    Войти
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
