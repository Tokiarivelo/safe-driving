'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center auth-background">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
        className="flex flex-col items-center gap-8"
      >
        <motion.div
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="[transform-style:preserve-3d] [perspective:1000px]"
        >
          <Image
            src="/logo.svg"
            alt="Safe Driving Logo"
            width={120}
            height={120}
            priority
            className="w-24 h-24 sm:w-32 sm:h-32"
          />
        </motion.div>

        <div className="flex flex-col items-center gap-4">
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 rounded-full bg-white"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            ))}
          </motion.div>

          <motion.p
            className="text-white text-lg font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Chargement en cours...
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

export default LoadingScreen;
