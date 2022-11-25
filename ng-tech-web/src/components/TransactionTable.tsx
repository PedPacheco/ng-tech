/* eslint-disable import/no-duplicates */
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { FunnelSimple } from "phosphor-react";
import { useEffect, useState } from "react";
import { filterTheTransactions } from "~/utils/FilterTheTransactions";
import { ModalDate } from "./ModalDate";
import { Transaction } from "./Transaction";

interface Transaction {
  id: string;
  debitedUsername: string;
  creditedUsername: string;
  value: number;
  createdAt: string;
}

export function TransactionTable() {
  const { token, userCookies } = parseCookies();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openDateModal, setOpenDateModal] = useState<boolean>(false);
  const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (token === "" || token === undefined) {
      router.push("/login");
    }

    async function getTransactions() {
      if (userCookies !== undefined) {
        const user = JSON.parse(userCookies);
        const headers = { authorization: token };
        await axios
          .get(`http://localhost:3333/transferencia/${user?.accountId}`, {
            headers,
          })
          .then((response) => {
            const data = response.data;
            setTransactionsList(data);
          });
      }
    }
    getTransactions();
  }, [router, token, userCookies]);

  async function catchFilteredTransactions(filter: string) {
    if (token === undefined || userCookies === undefined) {
      return;
    }

    const date = `${year}-${month}-${day}`;

    const data = await filterTheTransactions(token, userCookies, filter, date);
    setTransactionsList(data);
    setOpenDateModal(false);
  }

  return (
    <section className="p-4 pt-10 lg:p-10 lg:mt-24 flex items-center justify-center">
      <div className="w-full flex flex-col justify-center items-center border-[1px] border-black rounded lg:min-w-[900px] lg:w-[50%]">
        <div className="flex justify-between items-center px-6 w-full py-4  border-b border-black relative">
          <h2 className="text-2xl lg:text-3xl font-medium">Transações</h2>
          <FunnelSimple
            size={32}
            onClick={() => setOpenFilter(!openFilter)}
            className="hover:bg-zinc-100 w-10 h-10 rounded-sm transition-colors"
          />
          <div
            className={`${
              openFilter ? "block" : "hidden"
            } bg-black absolute top-14 left-auto right-4 rounded-2xl overflow-auto shadow-lg mr-1`}
          >
            <div>
              <p
                className="p-4 font-bold text-lg text-white hover:bg-zinc-700 transition-colors"
                onClick={() => catchFilteredTransactions("todas")}
              >
                TODAS
              </p>
              <p
                className="p-4 font-bold text-lg text-white hover:bg-zinc-700 transition-colors"
                onClick={() => setOpenDateModal(true)}
              >
                DATA
              </p>
              <p
                className="p-4 font-bold text-lg text-white hover:bg-zinc-700 transition-colors"
                onClick={() => catchFilteredTransactions("transacoes-cash-in")}
              >
                CASH-IN
              </p>
              <p
                className="p-4 font-bold text-lg text-white hover:bg-zinc-700 transition-colors"
                onClick={() => catchFilteredTransactions("transacoes-cash-out")}
              >
                CASH-OUT
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center px-6 w-full">
          <ul className="w-full my-4">
            {transactionsList.map((transaction) => (
              <Transaction
                createdAt={transaction.createdAt}
                debitedUsername={transaction.debitedUsername}
                creditedUsername={transaction.creditedUsername}
                value={transaction.value}
                key={transaction.id}
              />
            ))}
          </ul>
        </div>

        <ModalDate
          date={day}
          catchFilteredTransactions={catchFilteredTransactions}
          openDateModal={openDateModal}
          setDate={setDay}
          setYear={setYear}
          setMonth={setMonth}
          month={month}
          year={year}
          setOpenDateModal={setOpenDateModal}
        />
      </div>
    </section>
  );
}
