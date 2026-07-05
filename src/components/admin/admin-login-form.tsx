'use client'

import { useActionState } from 'react'
import { loginAction } from '@/lib/admin/admin-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Lock, LogIn, Mail } from 'lucide-react'

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return loginAction(formData)
    },
    null
  )

  return (
    <form action={action} className="space-y-5">
      {/* حقل الإيميل */}
      <div>
        <Label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
          البريد الإلكتروني
        </Label>
        <div className="relative">
          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            required
            dir="ltr"
            className="pr-10 h-11"
            placeholder="admin@alsalam.com"
          />
        </div>
      </div>

      {/* حقل الباسورد */}
      <div>
        <Label htmlFor="password" className="text-sm font-medium text-foreground mb-2 block">
          كلمة المرور
        </Label>
        <div className="relative">
          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type="password"
            required
            dir="ltr"
            className="pr-10 h-11"
            placeholder="••••••••"
          />
        </div>
      </div>

      {state?.error && (
        <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-lg px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-11 gap-2 font-semibold"
        disabled={pending}
      >
        <LogIn className="w-4 h-4" />
        {pending ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
      </Button>
    </form>
  )
}