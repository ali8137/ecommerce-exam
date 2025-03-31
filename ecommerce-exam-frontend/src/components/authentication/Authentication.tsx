'use client'

import React from 'react'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { login, register } from '@/redux/features/authentication/authSlice'
import { AppDispatch } from '@/redux/store'

export default function Authentication(prop: { isLoginComponent: boolean }) {
  const { isLoginComponent } = prop

  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()

  // TODO: use useCallback
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget as HTMLFormElement)

    if (isLoginComponent === true) {
      const loginData: { email?: string; password?: string } = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }

      await dispatch(login(loginData))

      router.replace('/categories')
      return
    }

    const registeringData: {firstName?: string; lastName?: string; email?: string; password?: string} = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    await dispatch(register(registeringData))

    router.replace('/categories')
  }
  // TODO: add the disabled, isSubmitting, errorResponse (or isError) and replace state of the <form>

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <LocalMallIcon
            sx={{ color: 'blue', fontSize: 45, mx: 'auto', display: 'block' }}
          />
          {isLoginComponent === true ? (
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
              Sign in to your account
            </h2>
          ) : (
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
              Sign up
            </h2>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLoginComponent && (
              <div>
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm/6 font-medium"
                  >
                    First Name
                  </label>
                  <div className="mt-2 border-2">
                    <input
                      id="first-name"
                      name="firstName"
                      type="text"
                      required
                      autoComplete="given-name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm/6 font-medium"
                  >
                    Last Name
                  </label>
                  <div className="mt-2 border-2">
                    <input
                      id="last-name"
                      name="lastName"
                      type="text"
                      required
                      autoComplete="family-name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium">
                Email address
              </label>
              <div className="mt-2 border-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium"
                >
                  Password
                </label>

                {isLoginComponent === true ? (
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="mt-2 border-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {isLoginComponent === true ? (
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            ) : (
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            )}
          </form>

          {isLoginComponent === true ? (
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Don't have an account?{' '}
              <Link
                href="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                sign up here
              </Link>
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}
