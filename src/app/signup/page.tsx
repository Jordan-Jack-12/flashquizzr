import { signUp } from '@/actions/auth/actions'
import styles from './signup.module.css'
import Link from 'next/link'
import { ERROR_MESSAGES } from '@/utils/errorCodes';

async function SignUpPage({searchParams} : {searchParams: Promise<{error: string | null}>}) {
    const { error } = await searchParams;
    return (
        <main className={styles.main}>
            <h1 className={styles.logo}>Flashquizzr</h1>
            <h2 className={styles.heading}>Sign Up</h2>
            <p className='text-center text-red-600 my-2'>{error != null && ERROR_MESSAGES[error]}</p>
            <form action={signUp} className={styles.form}>
                <div className={styles.form_element}>
                    <label htmlFor="first-name">First Name</label>
                    <input required type="text" name="first-name" id="first-name" minLength={2} placeholder='John'/>
                </div>
                <div className={styles.form_element}>
                    <label htmlFor="last-name">Last Name</label>
                    <input required type="text" name="last-name" id="last-name" min={2} placeholder='Doe'/>
                </div>
                <div className={styles.form_element}>
                    <label htmlFor="email">Email</label>
                    <input required type="email" name="email" id="email" placeholder='johndoe@example.com' pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'/>
                </div>
                <div className={styles.form_element}>
                    <label htmlFor="password">Password</label>
                    <input required type="password" name="password" id="password" minLength={8} placeholder='********'/>
                </div>
                <div className={styles.form_element}>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input required type="password" name="confirm-password" id="confirm-password" minLength={8} placeholder='********'/>
                </div>
                <div className={styles.checkbox}>
                    <input required type="checkbox" name="terms-agree" id="false" />
                    <p>By checking this box, you are agreeing to our <Link title='terms of service' href="/terms">terms of service.</Link></p>
                </div>
                <button type='submit' className={styles.button}>Sign Up</button>
                <p>Already Have An Account? <Link href={"/login"}>Log In</Link></p>
            </form>
        </main>
    )
}

export default SignUpPage