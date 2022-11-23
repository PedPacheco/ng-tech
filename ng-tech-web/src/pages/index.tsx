/* eslint-disable import/no-duplicates */
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
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
  const [user, setUser] = useState<User>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (token === "" || token === undefined) {
      router.push("/login");
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
    </div>
  );
}
