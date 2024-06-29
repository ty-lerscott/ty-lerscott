"use client";

import { IoWarningOutline } from "react-icons/io5";
import type { Code } from "@/types/generics.types";
import { FiClipboard, FiCheck } from "react-icons/fi";
import { useState, useEffect, type PropsWithChildren } from "react";

import styles from "./styles.module.css";

const Client = ({ text, children }: PropsWithChildren & Omit<Code, "type">) => {
  const [status, setStatus] = useState<"success" | "error" | "">("");

  const onClick = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      setStatus("success");
      console.log("saved to clipboard");
    } else {
      setStatus("error");
      console.log("cannot save to clipboard");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setStatus(["success", "error"].includes(status) ? "" : status);
    }, 1000);
  }, [status]);

  const Clipboard =
    status === "success"
      ? FiCheck
      : status === "error"
        ? IoWarningOutline
        : FiClipboard;

  return (
    <div data-testid="ClientWrapper" className={styles.CodeWrapper}>
      <button type="button" onClick={onClick} className={styles.Copy}>
        <Clipboard />
      </button>
      {children}
    </div>
  );
};

export default Client;
