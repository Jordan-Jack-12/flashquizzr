import SignupForm from '@/components/ui/auth/SignupForm';
import styles from './signup.module.css'

async function SignUpPage() {
    return (
        <main className={styles.main}>
            <h1 className={styles.logo}>Flashquizzr</h1>
            <h2 className={styles.heading}>Sign Up</h2>
            <SignupForm />
        </main>
    )
}

export default SignUpPage