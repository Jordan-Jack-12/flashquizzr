import Link from 'next/link'
import styles from './login.module.css'
import { logIn } from '@/actions/auth/actions'
import { ERROR_MESSAGES } from '@/utils/errorCodes';

async function LoginPage({searchParams} : {searchParams: Promise<{error: string | null}>}) {
    const { error } = await searchParams;
    return (
        <main className={styles.main}>
            <h1 className={styles.logo}>Flashquizzr</h1>
            <h2 className={styles.heading}>Log In</h2>
            <p className='text-center text-red-600 my-2'>{error != null && ERROR_MESSAGES[error]}</p>
            <form action={logIn} className={styles.form}>
                <div className={styles.form_element}>
                    <label htmlFor="email">Email</label>
                    <input required type="email" name="email" id="email" placeholder='johndoe@example.com' pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'/>
                </div>
                <div className={styles.form_element}>
                    <label htmlFor="password">Password</label>
                    <input required type="password" name="password" id="password" minLength={8} placeholder='********'/>
                </div>
                <button type='submit' className={styles.button}>Log In</button>
                <p>Don&apos;t Have An Account? <Link href={"/signup"}>Create Account</Link></p>
            </form>
            
        </main>
    )
}

export default LoginPage