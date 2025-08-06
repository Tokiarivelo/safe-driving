import styles from '../common/auth.module.css';
import { Suspense } from 'react';
import LeftChild from './left.child';
import RightChild from './right.child';
import AuthCard from '../common/AuthCard';

export const Login = () => {
  return (
    <AuthCard
      leftChildComponent={
        <Suspense
          fallback={
            <div className={styles.auth_londing_left}>
              <div className="spinner"></div>
            </div>
          }
        >
          <LeftChild />
        </Suspense>
      }
      rightChildComponent={
        <Suspense
          fallback={
            <div className={styles.auth_londing_left}>
              <div className="spinner"></div>
            </div>
          }
        >
          <RightChild />
        </Suspense>
      }
    />
  );
};
export default Login;
