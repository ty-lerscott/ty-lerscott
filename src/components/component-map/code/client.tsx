"use client";

import { useState, useEffect } from "react";
import { FiClipboard, FiCheck } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
import type { PropsWithChildren } from "react";
import type { Code } from "@/types/generics.types";

const Client = ({
  text,
  syntax,
  children,
}: PropsWithChildren & Omit<Code, "type">) => {
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
    <pre className={`language-${syntax} relative`}>
      <button
        type="button"
        onClick={onClick}
        className="absolute top-0 right-0 text-white p-2 h-auto w-auto"
      >
        <Clipboard />
      </button>
      {children}
    </pre>
  );
};

export default Client;
