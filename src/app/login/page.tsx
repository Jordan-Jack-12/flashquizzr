import styles from './login.module.css'

import LoginForm from '@/components/ui/auth/LoginForm';

async function LoginPage() {
    return (
        <main className={styles.main}>
            <h1 className={styles.logo}>Flashquizzr</h1>
            <h2 className={styles.heading}>Log In</h2>
            <LoginForm />
        </main>
    )
}

export default LoginPage