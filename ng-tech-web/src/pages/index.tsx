/* eslint-disable import/no-duplicates */
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { setCookie } from "nookies";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "~/components/Input";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    setDisabled(true);

    const response = await axios
      .post("http://localhost:3333/login", {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        return response.data;
      });

    const user = JSON.stringify(response.user);

    setCookie(undefined, "token", response.token);
    setCookie(undefined, "userCookies", user);

    Router.push("/home");
  };

  return (
    <>
      <div className="bg-black w-full h-24 flex items-center shadow-lg justify-center">
        <Image src="/logo.png" alt="Logo NG.CASH" width={160} height={30} />
      </div>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          className="w-full lg:w-[600px] h-full lg:h-[586px] lg:rounded-lg shadow-lg bg-white flex flex-col justify-center items-center"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="w-72 flex justify-start pb-4 px-2 mr-6 mb-10">
            <h2 className=" text-2xl font-semibold">Entre na sua conta NG</h2>
          </div>

          <div>
            <Input
              text="Nome de usuário"
              register={register}
              name="username"
              rules={{
                required: "Usário deve ser inserido",
              }}
              fieldname="username"
            />

            <ErrorMessage
              errors={errors}
              name="username"
              render={({ message }) => (
                <p className="text-red-600 w-72">{message}</p>
              )}
            />

            <Input
              text="Senha"
              type="password"
              name="password"
              fieldname="password"
              register={register}
              rules={{
                required: "Senha deve ser inserida",
              }}
            />
          </div>

          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <p className="text-red-600 w-72">{message}</p>
            )}
          />

          <div className="flex flex-col items-center justify-center ">
            <button
              type="submit"
              disabled={disabled}
              className="w-72 h-9 bg-transparent text-zinc-900 border-zinc-900 hover:border-zinc-600 hover:text-zinc-600 transition-colors border-2 mt-4 mb-10 rounded-xl font-medium cursor-pointer"
            >
              entrar
            </button>
            <p className="w-72 h-9 bg-transparent text-zinc-700 self-start font-medium">
              Não tem uma conta?{" "}
              <Link href="cadastrar" className="text-[#8257E5]">
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
