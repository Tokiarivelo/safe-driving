import styles from '../common/auth.module.css';
import { ICardProps } from './card-types';

export const AuthCard = ({
  leftChildComponent: lefiChildComponent,
  rightChildComponent: righChildComponent,
}: ICardProps) => {
  return (
    <>
      <div className={styles.auth_card_un_container}>
          {lefiChildComponent}
      </div>

      <div className={styles.auth_card_deux_container}>{righChildComponent}</div>
    </>
  );
};

export default AuthCard;
