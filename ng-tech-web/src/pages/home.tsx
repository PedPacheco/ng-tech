/* eslint-disable import/no-duplicates */
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { ModalError } from "~/components/ErrorModal";
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
  const [error, setError] = useState<string>("");
  const [errorIsTrue, setErrorIsTrue] = useState<boolean>(false);
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
      setError("Não é possível fazer a transferência para esse usuário !");
      setErrorIsTrue(true);
      setDisabled(false);
      return;
    }

    const data = {
      fromUsername: user?.username,
      toUsername: username,
      amount: Number(amount),
    };

    const headers = { authorization: token };
    const response = await axios
      .put("http://localhost:3333/transferencia", data, { headers })
      .then((response) => {
        setDisabled(false);
        return response.data;
      })
      .catch((error) => {
        setDisabled(false);
        setError(error.response.data);
        setErrorIsTrue(true);
      });

    if (response) {
      router.reload();
    }
  }

  return (
    <div>
      <Header username={user?.username} />
      <SendTransaction handleTransfer={handleTransfer} disabled={disabled} />
      <TransactionTable />

      {errorIsTrue ? (
        <ModalError
          message={error}
          title="TRANSFERÊNCIA NÃO REALIZADA"
          errorIsTrue={errorIsTrue}
          setErrorIsTrue={setErrorIsTrue}
        />
      ) : null}
    </div>
  );
}
