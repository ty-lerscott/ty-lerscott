"use client";

import { useEffect, useState } from "react";
import styles from "./styles/header.module.css";
import { motion, useAnimation } from "framer-motion";

const Header = ({ roles }: { roles: string[] }) => {
  const [position, setPosition] = useState<number>(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.set({ top: "0px", opacity: 1 });
    const timer = setTimeout(async () => {
      await controls.start({ top: "0.5rem", opacity: 0 });
      setPosition((state) => (state === roles.length - 1 ? 0 : state + 1));
    }, 3000);
    return () => clearTimeout(timer);
  }, [setPosition, position, controls, roles.length]);

  return (
    <div data-testid="ResumeHeader" className={styles.Header}>
      <div className={styles.Wrapper}>
        <h1 className={styles.Name}>Tyler Scott Williams</h1>
        <div className={styles.AnimatedTextWrapper}>
          <p className="text-transparent absolute">{roles[position]}</p>
          <motion.p
            animate={controls}
            className={styles.AnimatedText}
            transition={{
              duration: 0.2,
            }}
          >
            {roles[position]}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Header;
