/* eslint-disable import/no-duplicates */
import { ErrorMessage } from "@hookform/error-message";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import nookies from "nookies";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "~/components/Input";

export default function Login() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const handleSignIn: SubmitHandler<FieldValues> = async (data) => {
    const response = await axios
      .post("http://localhost:3333/cadastrar", {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        return response.data;
      });

    nookies.set(undefined, "token", response.token, {
      maxAge: 30 * 24 * 60 * 60,
    });

    const user = JSON.parse(response.user);

    nookies.set(undefined, "user", user, {
      maxAge: 30 * 24 * 60 * 60,
    });

    Router.push("/");
  };

  return (
    <>
      <div className="bg-black w-full h-24 flex items-center shadow-lg justify-center">
        <Image src="/logo.png" alt="Logo NG.CASH" width={160} height={30} />
      </div>
      <div className="flex flex-col items-center justify-center h-[100vh] lg:h-[80vh]">
        <form
          className="w-full h-full bg-white lg:w-[600px] lg:h-[586px] lg:rounded-lg shadow-lg flex flex-col justify-center items-center"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <div className="w-72 flex justify-start pb-4 px-2 mr-6 mb-2">
            <h2 className=" text-2xl font-bold =">Crie sua conta NG</h2>
          </div>

          <div>
            <Input
              text="Nome de usuário"
              register={register}
              name="username"
              rules={{
                required: "Usário deve ser inserido",
                minLength: {
                  value: 3,
                  message: "Usuario deve ter no minimo 3 letras",
                },
              }}
              fieldname="username"
            />

            <ErrorMessage
              errors={errors}
              name="username"
              render={({ message }) => (
                <p className="text-red-600">{message}</p>
              )}
            />

            <Input
              text="Senha"
              name="password"
              register={register}
              fieldname="password"
              type="password"
              rules={{
                required: "Senha deve ser inserida",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                  message:
                    "Senha deve ser composta por pelo menos 8 caracteres, um número e uma letra maiúscula",
                },
              }}
            />

            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <p className="text-red-600 w-72">{message}</p>
              )}
            />

            <Input
              text="Confirmar senha"
              type="password"
              name="confirmationPassword"
              fieldname="confirmationPassword"
              register={register}
              rules={{
                required: "Senha de confirmação deve ser inserida",
                validate: (val: string) => {
                  if (watch("password") !== val) {
                    return "As senhas devem ser iguais";
                  }
                },
              }}
            />
          </div>

          <ErrorMessage
            errors={errors}
            name="confirmationPassword"
            render={({ message }) => (
              <p className="text-red-600 w-72">{message}</p>
            )}
          />

          <div className="flex flex-col items-center justify-center ">
            <button
              type="submit"
              className="w-72 h-9 bg-transparent text-zinc-900 transition-colors rounded-xl mb-10 mt-4 border-zinc-700 border-2 font-medium"
            >
              Cadastre-se
            </button>
            <p className="w-72 h-9 bg-transparent text-zinc-900 self-start font-medium">
              Já tem uma conta?{" "}
              <Link href="cadastrar" className="text-[#8257E5]">
                Entrar
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
