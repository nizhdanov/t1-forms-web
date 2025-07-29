import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { GalleryVerticalEndIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { login } from '@/api/requests/v1/auth/login';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  validateSearch: zodValidator(z.object({
    redirect: z.string().optional()
  }))
});

const loginFormSchema = z.object({
  email: z.email({ error: 'Невалидный email' }).min(1, { error: 'Email обязателен' }),
  password: z.string().min(1, { error: 'Пароль обязателен' })
});

function RouteComponent() {
  const search = Route.useSearch();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: 'admin@inno.tech',
      password: 'admin'
    },
    mode: 'onBlur'
  });

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onError: (err: ResponseError) => {
      const messages = typeof err.data?.message === 'string' ? err.data?.message : err.data?.message.join(', ');
      form.setError('root', {
        message: messages
      });
    },
    onSuccess: () => {
      router.history.push(search.redirect ?? '/');
    }
  });

  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    loginMutation.mutateAsync({ dto: values });
  };

  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <span className='flex items-center gap-2 self-center font-medium'>
          <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
            <GalleryVerticalEndIcon className='size-4' />
          </div>
          Admin Dashboard
        </span>
        <div className='flex flex-col gap-6'>
          <Card>
            <CardHeader className='text-center'>
              <CardTitle className='text-xl'>Добро пожаловать</CardTitle>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form className='grid gap-6' onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    render={({ field }) => (
                      <FormItem className='grid gap-3'>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type='email'
                            autoComplete='email'
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
}
