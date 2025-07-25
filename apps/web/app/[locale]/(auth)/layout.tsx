import styles from './auth.module.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.auth_container}>
      <div className={styles.auth_card_container}>
        {children}
      </div>
    </div>
  );
}
