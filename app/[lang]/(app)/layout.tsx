import { Layout } from "@/components/layout/layout";
import { Locale } from "@/i18n.config";
import "@/styles/globals.css";

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return <Layout lang={lang}>{children}</Layout>;
}
