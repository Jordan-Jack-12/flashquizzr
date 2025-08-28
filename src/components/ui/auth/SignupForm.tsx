'use client';

import Link from 'next/link';
import styles from './signup.module.css'
import React, { useActionState } from 'react'
import { signUp } from '@/app/signup/action';

const SignupForm = () => {

    const [state, action, pending] = useActionState(signUp, undefined)

    return (
        <div>
            {state?.error_msg && <p className='text-base text-red-500 text-center mt-4'>{state.error_msg}</p>}
            <form action={action} className={styles.form}>
                <div className={styles.form_element}>
                    <label htmlFor="first-name">First Name</label>
                    <input required type="text" name="first-name" id="first-name" minLength={2} placeholder='John' />
                </div>
                <div className={styles.form_element}>
                    <label htmlFor="last-name">Last Name</label>
                    <input required type="text" name="last-name" id="last-name" min={2} placeholder='Doe' />
                </div>
                <div className={styles.form_element}>
                    <label htmlFor="email">Email</label>
                    <input required type="email" name="email" id="email" placeholder='johndoe@example.com' />
                </div>
                {state?.errors?.email && <p className='*:text-sm *:text-red-500'>{state.errors.email}</p>}
                <div className={styles.form_element}>
                    <label htmlFor="password">Password</label>
                    <input required type="password" name="password" id="password" minLength={8} placeholder='********' />
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
                <div className={styles.form_element}>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input required type="password" name="confirm-password" id="confirm-password" minLength={8} placeholder='********' />
                </div>
                <div className={styles.checkbox}>
                    <input required type="checkbox" name="terms-agree" id="false" />
                    <p>By checking this box, you are agreeing to our <Link title='terms of service' href="/terms">terms of service.</Link></p>
                </div>
                <button type='submit' disabled={pending} className={styles.button}>
                    {pending ? "Signing Up..." : 'Sign Up'}
                </button>
                <p>Already Have An Account? <Link href={"/login"}>Log In</Link></p>
            </form>
        </div>
    )
}

export default SignupForm