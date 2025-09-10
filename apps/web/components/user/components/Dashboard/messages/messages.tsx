import React from 'react';

import { Input } from '@/components/ui/input-rechercher';
import { Icon } from '@iconify/react';
import ListeMessage from './left.child';
import MpMessage from './centre.child';
import Fichier from './right.child';
import styles from './messages.module.css';
function messages() {
  return (
    <div className={styles.auth_msg1}>
      <div className={styles.auth_msg2}>
        <div className={styles.auth_msg3}></div>
        <div className={styles.auth_msg4}>
          <div className={styles.auth_msg5}>
            <div className={styles.auth_msg6}>
              <h1>Messages</h1>
            </div>
            <hr />
            <div className={styles.auth_msg7}>
              <div className={styles.auth_msg8}>
                <Input
                  type="text"
                  placeholder="Rechercher message / utilisateur"
                  startOrnerIcon={<Icon icon="material-symbols:search" width="24" height="24" />}
                />
              </div>
              <div className={styles.auth_msg9}>
                <Icon icon="gridicons:filter" width="30" height="30" />
              </div>
            </div>
          </div>
          <div className={styles.auth_msg10}>
            <ListeMessage />
          </div>
        </div>
        <div className={styles.auth_msg11}>
          <MpMessage />
        </div>
        <div className={styles.auth_msg12}>
          <Fichier/>
        </div>
      </div>
    </div>
  );
}
export default messages;
