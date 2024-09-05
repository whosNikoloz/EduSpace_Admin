import { AuthLayoutWrapper } from "@/components/auth/authLayout";
import "@/styles/globals.css";
import { Locale } from "next/dist/compiled/@vercel/og/satori";

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return <AuthLayoutWrapper lang={lang}>{children}</AuthLayoutWrapper>;
}
