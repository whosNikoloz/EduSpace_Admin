import React from "react";
import Login from "@/components/auth/login";
import { Locale } from "@/i18n.config";

export default function login({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return <Login lang={lang} />;
}
