/* eslint-disable import/no-duplicates */
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";
import { Header } from "~/components/Header";
import { SendTransaction } from "~/components/SendTransaction";
import { TransactionTable } from "~/components/TransactionTable";

interface User {
  id: string;
  username: string;
  password: string;
  accountId: string;
}

export default function Home() {
  const { token, userCookies } = parseCookies();
  const [user, setUser] = useState<User>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const router = useRouter();

  // useEffect(() => {
  //   if (token === "") {
  //     router.push("/login");
  //   }

  //   if (userCookies !== undefined) {
  //     const objectUser = JSON.parse(userCookies);
  //     setUser(objectUser);
  //   }
  // }, [router, token, userCookies]);

  async function handleTransfer(username: string, amount: number | undefined) {
    if (!username || !amount) {
      return;
    }

    const data = {
      fromUsername: user?.username,
      toUsername: username,
      amount,
    };

    const headers = { authorization: token };
    const response = await axios
      .put("http://localhost:3333/transferencia", data, { headers })
      .then((response) => {
        setOpenModal(true);
        return response.data;
      })
      .catch((error) => {
        setOpenModal(true);
        console.log(error);
      });
  }

  return (
    <div>
      <Header username={user?.username} />
      <SendTransaction handleTransfer={handleTransfer} />
      <TransactionTable />
    </div>
  );
}
