import Image from "next/image";
import React, { useState } from "react";
import { X } from "phosphor-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100vh] ">
        <div className="bg-black w-full flex items-center">
          <button>
            <X />
          </button>
          <Image
            src="/logo.png"
            alt="Logo NG.CASH"
            width={160}
            height={30}
            className=""
          />
        </div>
        <form className="w-full h-full shadow bg-black flex flex-col justify-center items-center">
          <div className="flex justify-center pb-4">
            <h2 className="text-white text-2xl font-bold">
              Entre na sua conta NG
            </h2>
          </div>

          <div>
            <div className="flex flex-col py-3">
              <label htmlFor="usuario" className="text-white">
                Usuario
              </label>
              <input
                className="h-14 w-72 mt-3 px-2 rounded bg-transparent border border-solid border-zinc-700 outline-none text-white"
                type="text"
                id="usuario"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="flex flex-col py-3">
              <label htmlFor="password" className="text-white">
                Senha
              </label>
              <input
                className="h-14 w-72 mt-3 px-2 rounded bg-transparent border border-solid border-zinc-700 outline-none text-white"
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          <div className="flex flec-col">
            <button type="submit">Login</button>
            <button type="button">Cadastrar-se</button>
          </div>
        </form>
      </div>
    </>
  );
}
