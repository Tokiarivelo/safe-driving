import React from 'react';

import styles from './typing-indicator.module.css';

export default function TypingIndicator({
  typingUsers,
}: {
  typingUsers: { userId: string; userName: string }[];
}) {
  if (!typingUsers || typingUsers.length === 0) return null;

  const names = typingUsers.map(u => u.userName);
  let text = '';

  if (names.length === 1) {
    text = `${names[0]} est en train d'écrire…`;
  } else if (names.length === 2) {
    text = `${names[0]} et ${names[1]} sont en train d'écrire…`;
  } else {
    const others = names.length - 2;
    text = `${names[0]}, ${names[1]} et ${others} autre${others > 1 ? 's' : ''} sont en train d'écrire…`;
  }

  return (
    <div className="text-sm text-gray-500 flex items-center gap-2">
      <span>{text}</span>
      {/* petits points animés */}
      <span className={styles['typing-dots']} aria-hidden>
        <span className={styles.dot}>.</span>
        <span className={styles.dot}>.</span>
        <span className={styles.dot}>.</span>
      </span>
    </div>
  );
}
