import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Loader2, LogIn } from 'lucide-react'
import { useAuthStore } from '../../../../stores/auth-store'
import { cn } from '../../../../lib/utils'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../components/ui/form'
import { Input } from '../../../../components/ui/input'
import { PasswordInput } from '../../../../components/password-input'
import { Button } from '../../../../components/ui/button'
import axios from 'axios'
import { toast } from 'sonner'

const formSchema = z.object({
  identifier: z
    .string()
    .min(1, 'Please enter your email or mobile number.'),

  password: z
    .string()
    .min(1, 'Please enter your password.'),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL
      
      const response = await axios.post(`${baseUrl}users/login/`, {
        identifier: data.identifier,
        password: data.password,
      })

      const result = response.data

      if (result.status !== 1001) {
        throw new Error(result.message)
      }

      auth.setUser(result.data.user)
      auth.setAccessToken(result.data.access)
      localStorage.setItem('refresh_token', result.data.refresh)

      toast.success(result.message)

      const targetPath = redirectTo || '/'
      navigate({ to: targetPath, replace: true })
      
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data
        const message =
          errorData?.data?.non_field_errors?.[0] ||
          errorData?.message
        if (message) {
          toast.error(message)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='identifier'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Enter email/mobile number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={isLoading}>
          {isLoading ? <Loader2 className='animate-spin' /> : <LogIn />}
          Sign in
        </Button>

      </form>
    </Form>
  )
}
