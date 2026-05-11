'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function SignupForm() {
    const [state, action, pending] = useActionState(signup, undefined)

    return (
        <form action={action} className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>

            {/* Name */}
            <div>
                <label htmlFor="name" className="block font-medium">Name</label>
                <input id="name" name="name" placeholder="Name"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                {state?.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block font-medium">Email</label>
                <input id="email" name="email" type="email" placeholder="Email"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                {state?.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
                <label htmlFor="phone" className="block font-medium">Phone</label>
                <input id="phone" name="phone" type="tel" placeholder="Phone Number"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                {state?.errors?.phone && <p className="text-red-500 text-sm mt-1">{state.errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
                <label htmlFor="password" className="block font-medium">Password</label>
                <input id="password" name="password" type="password" placeholder="Password"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                {state?.errors?.password && (
                    <div className="text-red-500 text-sm mt-1">
                        <p>Password must:</p>
                        <ul className="list-disc pl-5">
                            {state.errors.password.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <button disabled={pending} type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold hover:bg-blue-600 transition disabled:bg-gray-400">
                {pending ? 'Signing Up...' : 'Sign Up'}
            </button>
        </form>
    )
}
