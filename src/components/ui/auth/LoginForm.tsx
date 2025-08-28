'use client';

import { logIn } from '@/app/login/action';
import styles from './login.module.css'
import Link from 'next/link'

import React, { useActionState } from 'react'

const LoginForm = () => {

    const [state, action, pending] = useActionState(logIn, undefined);

    return (
        <div>
            {state?.message && <p className='text-base text-red-500 text-center mt-4'>{state.message}</p>}
            <form action={action} className={styles.form}>
                <div className={styles.form_element}>
                    <label htmlFor="email">Email</label>
                    <input required type="email" name="email" id="email" placeholder='johndoe@example.com' />
                </div>
                {state?.errors?.email && <p className='*:text-sm *:text-red-500'>{state.errors.email}</p>}
                <div className={styles.form_element}>
                    <label htmlFor="password">Password</label>
                    <input className={`${state?.errors?.password ? "border-red-500" : ""}`} required type="password" name="password" id="password" minLength={8} placeholder='********' />
                </div>
                {state?.errors?.password && (
                    <div className='*:text-sm *:text-red-500'>
                        <p>Password must:</p>
                        <ul>
                            {state.errors.password.map((error) => (
                                <li key={error}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <button disabled={pending} type='submit' className={styles.button}>
                    {
                        pending ? "Loging in..." : "Log In"
                    }
                </button>
                <p>Don&apos;t Have An Account? <Link href={"/signup"}>Create Account</Link></p>
            </form>
        </div>
    )
}

export default LoginForm