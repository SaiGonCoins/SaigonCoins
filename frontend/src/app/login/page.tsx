'use client';

import { useActionState, useEffect } from 'react';
import { login } from '@/app/actions/auth';

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  useEffect(() => {
    if (state?.success && state.user) {
      // Lưu thông tin phản hồi (có thể chứa token và user)
      localStorage.setItem('user', JSON.stringify(state.user));

      // state.user có thể có cấu trúc: { message, token, user: { ... } }
      // Hoặc có thể trực tiếp là user. Xác định role một cách an toàn.
      const resp: any = state.user;
      const role = resp?.user?.role ?? resp?.role;

      // Backend cũ dùng role === 0 cho admin. Frontend admin string cũng được hỗ trợ.
      const isAdmin = role === 0 || role === 'admin' || role === 'Admin';

      if (isAdmin) {
        window.location.href = '/admin/products';
      } else {
        window.location.href = '/';
      }
    }
  }, [state]);

  return (
    <form action={formAction} className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>

      <div>
        <label htmlFor="email" className="block font-medium">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {state?.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block font-medium">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Mật khẩu"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {state?.errors?.password && <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>}
      </div>

      {state?.errors && typeof state.errors === 'string' && (
        <p className="text-red-500 text-sm mt-1 text-center">{state.errors}</p>
      )}

      <button
        disabled={pending}
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold hover:bg-blue-600 transition disabled:bg-gray-400"
      >
        {pending ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
    </form>
  );
}
