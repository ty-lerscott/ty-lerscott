import type { ReactNode } from "react";

export const metadata = {
  title: "Not Found",
  description: "Page Not Found",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
