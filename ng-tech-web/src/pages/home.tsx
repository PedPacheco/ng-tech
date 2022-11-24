/* eslint-disable import/no-duplicates */
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { Warning } from "phosphor-react";
import { useEffect, useState } from "react";
import { Header } from "~/components/Header";
import { SendTransaction } from "~/components/SendTransaction";
import { TransactionTable } from "~/components/TransactionTable";

export interface User {
  id: string;
  username: string;
  password: string;
  accountId: string;
}

export default function Home() {
  const { token, userCookies } = parseCookies();
  const [userIsEqual, setUserIsEqual] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (token === "" || token === undefined) {
      router.push("/");
    }

    if (userCookies !== undefined) {
      const objectUser = JSON.parse(userCookies);
      setUser(objectUser);
    }
  }, [router, token, userCookies]);

  async function handleTransfer(username: string, amount: string) {
    setDisabled(true);
    if (!username || !amount) {
      return;
    }

    if (username === user?.username) {
      setUserIsEqual(true);
      setDisabled(false);
      return;
    }

    const data = {
      fromUsername: user?.username,
      toUsername: username,
      amount: Number(amount),
    };

    const headers = { authorization: token };
    await axios
      .put("http://localhost:3333/transferencia", data, { headers })
      .then((response) => {
        setDisabled(false);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    router.reload();
  }

  return (
    <div>
      <Header username={user?.username} />
      <SendTransaction handleTransfer={handleTransfer} disabled={disabled} />
      <TransactionTable />

      <div
        className={`${
          userIsEqual ? "block" : "hidden"
        } fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white shadow-xl w-[420px] h-52 rounded border-2`}
      >
        <div className="flex w-full mx-auto items-center justify-center">
          <div className="flex flex-col items-center justify-around py-2 w-full">
            <Warning size={60} className="text-red-600" />
            <h1 className="font-semibold text-xl">
              TRANSFERÊNCIA NÃO REALIZADA
            </h1>
            <p className="font-medium mt-4">
              Não é possível fazer a transferência para esse usuário !
            </p>
            <button
              className="w-12 h-8 bg-black text-white transition-colors rounded mt-6"
              onClick={() => setUserIsEqual(false)}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
