"use client";

import Authentication from "@/app/api/User/auth";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { InputLoadingBtn } from "./inputloadingbtn";
import { Locale } from "@/i18n.config";
import { Spinner } from "@nextui-org/spinner";
import { useTranslations } from "@/actions/localisation";

interface ApiResponse {
  success: boolean;
  result?: string;
  error?: string;
}

export default function Login({ lang }: { lang: Locale }) {
  const translations = useTranslations(lang, "Login");

  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [loginEmailError, setLoginEmailError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [logEmailHasBlurred, setEmailLogHasBlurred] = useState(false);

  const [email, setEmail] = useState("nik.kobaidze@gmail.com");
  const [password, setPassword] = useState("1@Admin1@");

  const [Logloader, setLogLoader] = useState(false);

  const auth = Authentication();

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const handleLoginEmailExists = async () => {
    setLoginEmailError("");
    const isEmailValid = validateEmail(email);
    try {
      if (email === "") {
        setLoginEmailError("");
        setEmailLogHasBlurred(false);
        return;
      }
      if (!isEmailValid) {
        setLoginEmailError("Invalid email");
        setEmailLogHasBlurred(false);
        return;
      }
      setEmailLogHasBlurred(true);
      setLogLoader(true);
      const response = (await auth.checkEmailLogin(email)) as ApiResponse;
      if (!response.success) {
        setLoginEmailError(response.result || "Email doesnot exists");
        setEmailLogHasBlurred(false);
      } else {
        setLogLoader(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setLoginError("");

    try {
      const response = (await auth.handleLogin(email, password)) as ApiResponse;

      if (!response.success) {
        setLoginError(response.result || translations.loginError);
      } else {
        const redirectUrl = sessionStorage.getItem("redirect_url");
        sessionStorage.removeItem("redirect_url");
        router.push(redirectUrl || "/");
      }
    } catch (error) {
      setLoginError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  if (!translations) {
    return <Spinner />;
  }
  return (
    <>
      <div className="text-center text-[25px] font-bold mb-6">
        {translations.loginTitle || "Login"}
      </div>
      <form onSubmit={handleLogin} className="flex flex-col w-1/2 gap-4 mb-4">
        <Input
          variant="bordered"
          label="Email"
          type="email"
          classNames={{
            input: ["text-[16px] "],
          }}
          endContent={
            logEmailHasBlurred ? (
              <InputLoadingBtn loading={Logloader} success={true} />
            ) : (
              <></>
            )
          }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isInvalid={loginEmailError !== ""}
          errorMessage={loginEmailError}
          onBlur={handleLoginEmailExists}
          startContent={<i className="fas fa-envelope"></i>}
          // isInvalid={!!errors.email && !!touched.email}
          // errorMessage={errors.email}
        />
        <Input
          type="password"
          label={translations.inputPassword || "Password"}
          variant="bordered"
          classNames={{
            input: ["text-[16px] "],
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          startContent={<i className="fas fa-lock"></i>}
        />
        <div className="flex justify-center">
          {loginError && (
            <div className="text-red-500 text-center ">{loginError}</div>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            type="submit" // Ensures the button is of type submit
            isLoading={isLoading}
            variant="flat"
            color="primary"
            className="sm:w-1/5 w-3/4"
          >
            {translations.loginButton || "Login"}
          </Button>
        </div>
      </form>
    </>
  );
}
