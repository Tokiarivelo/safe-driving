import React from 'react'

import { Icon } from '@iconify/react';
import { Input } from '@/components/ui/input-rechercher';
import { ChevronUp} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import styles from './messages.module.css';
function right() {
  return (
    <>
          <div className={styles.auth_right1}>
            <div className={styles.auth_right2}></div>
            <div className={styles.auth_right3}></div>
          </div>
          <div className={styles.auth_right4}>
            <div className={styles.auth_right5}>
              <h1>Heritiana Mickael</h1>
            </div>
            <div className={styles.auth_right6}>⭐ 4.2</div>
          </div>
          <div className={styles.auth_right7}>
            <div className={styles.auth_right8}>🚗 Peugeot 205</div>
            <div className={styles.auth_right8}>🪑 Nb de place:4</div>
          </div>
          <div className={styles.auth_right9}>📞 (+261) 34...</div>
          <div className={styles.auth_right10}></div>
          <div className={styles.auth_right11}>
            <Input
              type="text"
              placeholder="Rechercher messages"
              startOrnerIcon={<Icon icon="material-symbols:search" width="24" height="24" />}
            />
          </div>
          <div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger><div className={styles.auth_right12}>
                     <div><Icon icon="ph:files-thin" width="30" height="30" /></div>
                     <div>Fichier</div>
                     <div className={styles.auth_right13}>+9</div>
                     <div className='ml-30'><ChevronUp size={20} strokeWidth={2} /></div>
                  </div></AccordionTrigger>
                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div>
              <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger><div className={styles.auth_right14}>
                     <div><Icon icon="ri:links-fill" width="30" height="30" /></div>
                     <div>Liens</div>
                     <div className={styles.auth_right15}>+9</div>
                     <div className={styles.auth_right16}><ChevronUp size={20} strokeWidth={2} /></div>
                  </div></AccordionTrigger>
                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
    </>
  )
}

export default right