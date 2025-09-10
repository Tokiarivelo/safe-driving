import React from 'react';

import { Icon } from '@iconify/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import styles from './messages.module.css';
function listeMessage() {
  return (
    <>
      <div className={styles.auth_left1}>
        <div className={styles.auth_left2}>
          <div className={styles.auth_left3}></div>
          <div className={styles.auth_left4}></div>
        </div>
        <div className={styles.auth_left5}>
          <div className={styles.auth_left6}>
            <div className={styles.auth_left7}>Mickael</div>
            <div className={styles.auth_left8}>07:40 am</div>
            <div className={styles.auth_left9}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className={styles.auth_left10}>
                    <div className={styles.auth_left11}></div>
                    <div className={styles.auth_left11}></div>
                    <div className={styles.auth_left11}></div>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  side="bottom"
                  align="start"
                  className={styles.auth_left12}
                >
                  <div className={styles.auth_left13}>
                    <div className={styles.auth_left14}>
                      <Icon
                        icon="material-symbols:archive-outline-rounded"
                        width="24"
                        height="24"
                      />
                    </div>
                    <div className={styles.auth_left15}>Archiver</div>
                  </div>
                  <DropdownMenuSeparator />
                  <div className={styles.auth_left16}>
                    <div className={styles.auth_left17}>
                      <Icon icon="mdi:delete-forever" width="24" height="24" />
                    </div>
                    <div className={styles.auth_left18}>
                      Supprimer conversation{' '}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className={styles.auth_left19}>
            <div className={styles.auth_left20}>
              Lorem ipsum dolor ...
            </div>
            <div className="bg-violet-400-400 w-[30%] h-10 justify-center flex items-center">
              <div className={styles.auth_left22}>
                +9
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default listeMessage;
