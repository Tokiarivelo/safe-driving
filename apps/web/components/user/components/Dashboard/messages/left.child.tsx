import React from 'react';

import styles from './messages.module.css';
import { Input } from '@/components/ui/input-rechercher';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
function left() {
  return (
    <>
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
        <button className="w-full">
          <div className="flex">
            <div className={styles.auth_left1}>
              <div className={styles.auth_left2}>
                <div className={styles.auth_left3}>{/* image */}</div>
                <div className={styles.auth_left4}></div>
              </div>
              <div className={styles.auth_left5}>
                <div className={styles.auth_left6}>
                  <div className={styles.auth_left7}>Mickael</div>
                  <div className={styles.auth_left8}>01/10/2025</div>
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
                          <div className={styles.auth_left18}>Supprimer conversation </div>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className={styles.auth_left19}>
                  <div className={styles.auth_left20}>direct</div>
                  <div className="w-[30%] h-9 justify-center flex items-center">
                    <div className={styles.auth_left22}>+9</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[1%] h-15 auth-background border-b-2 border-[#E5E7EB]"></div>
          </div>
        </button>
      </div>
      <div className="w-full h-[8%] flex items-center justify-center">
        <Button className="bg-pink-500 w-35 h-8 text-white">charger plus</Button>
      </div>
    </>
  );
}

export default left;
