/* eslint-disable import/no-duplicates */
import { parseCookies } from "nookies";
import { ArrowRight } from "phosphor-react";
import { useEffect, useState } from "react";
import { User } from "~/pages/home";

interface TransactionsProps {
  debitedUsername: string;
  creditedUsername: string;
  value: number;
  createdAt: string;
}

export function Transaction({
  createdAt,
  creditedUsername,
  debitedUsername,
  value,
}: TransactionsProps) {
  const [user, setUser] = useState<User>();
  const [day, setDay] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const { userCookies } = parseCookies();

  useEffect(() => {
    if (userCookies !== undefined) {
      const objectUser = JSON.parse(userCookies);
      setUser(objectUser);
    }
    setMonth(new Date(createdAt).getMonth() + 1);
    setDay(new Date(createdAt).getDate() + 1);
    setYear(new Date(createdAt).getFullYear());
  }, [createdAt, userCookies]);

  return (
    <li className="my-10">
      <div className="flex justify-between items-center w-full">
        <p className="font-bold text-xl">Transferência Recebida</p>
        <span className="font-semibold text-zinc-400 text-sm">{`${day}/${month}/${year}`}</span>
      </div>
      <div className="ml-3 mt-3 flex items-center justify-between">
        <div className="flex flex-col items-start justify-center">
          <p className="font-medium text-xl">{debitedUsername.toUpperCase()}</p>
          <span className="font-medium text-xl">
            - R$ {Number(value).toFixed(2)}
          </span>
        </div>

        {debitedUsername === user?.username ? (
          <ArrowRight size={56} className="font-medium text-xl text-red-400" />
        ) : (
          <ArrowRight
            size={56}
            className="font-medium text-xl text-green-400"
          />
        )}

        <div className="flex flex-col items-start justify-center">
          <p className="font-medium text-xl">
            {creditedUsername.toUpperCase()}
          </p>
          <span className="font-medium text-xl">
            + R$ {Number(value).toFixed(2)}
          </span>
        </div>
      </div>
    </li>
  );
}
