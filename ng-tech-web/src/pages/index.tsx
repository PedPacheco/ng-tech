/* eslint-disable import/no-duplicates */
import axios from "axios";
import { headers } from "next.config";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Header } from "~/components/Header";

interface User {
  id: string;
  username: string;
  password: string;
  accountId: string;
}

export default function Home() {
  const { token, userCookies } = parseCookies();
  const [user, setUser] = useState<User>();
  const [username, setUsername] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (token === "") {
      router.push("/login");
    }

    if (userCookies !== undefined) {
      const objectUser = JSON.parse(userCookies);
      setUser(objectUser);
    }
  }, [router, token, userCookies]);

  async function handleTransfer() {
    const data = {
      fromUsername: user?.username,
      toUsername: username,
      amount: Number(amount),
    };
    const headers = { authorization: token };
    const response = await axios
      .put("http://localhost:3333/transferencia", data, { headers })
      .then((response) => {
        return response.data;
      });

    console.log(response);
  }

  return (
    <div>
      <Header username={user?.username} />

      <div className="w-full h-full flex flex-col items-center justify-between">
        <div className="w-full lg:h-72 bg-black mb-auto mt-auto">
          <div className="h-full flex flex-col justify-between items-center">
            <h1 className="text-white justify-center text-3xl font-medium mt-6">
              Fazer transferência
            </h1>

            <div className="flex flex-col lg:flex-row items-center justify-between w-full">
              <div className="w-64 lg:w-auto flex justify-center items-center flex-col mx-auto lg:ml-auto lg:mr-16 py-4">
                <span className="text-[hsla(0,0%,100%,.9)] text-center lg:text-lg font-light">
                  Digite o usuário deseja fazer a tranferênica:
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-56 lg:w-60 h-8 mt-3 rounded-lg border-2 pl-2 border-zinc-700"
                />
              </div>
              <div className="w-64 lg:w-auto flex justify-center items-center flex-col mx-auto lg:mr-auto lg:ml-16 py-4">
                <span className="text-[hsla(0,0%,100%,.9)] font-light lg:text-lg">
                  Digite o valor da tranferênica:
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  className="w-56 lg:w-60 h-8 mt-3 rounded-lg border-2 pl-2 border-zinc-700"
                />
              </div>
            </div>

            <button
              onClick={handleTransfer}
              className="w-64 lg:w-[480px] h-8 lg:h-10 text-zinc-900 text-lg bg-white transition-colors border-2 border-zinc-500 flex items-center justify-center py-1 mt-4 mb-10 rounded-xl font-medium"
            >
              Transferir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
