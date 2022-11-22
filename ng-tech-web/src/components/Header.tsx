import axios from "axios";
import Image from "next/image";
import { parseCookies } from "nookies";
import { List, X } from "phosphor-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  username: string | undefined;
}

export function Header({ username }: HeaderProps) {
  const [balance, setBalance] = useState<number>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const { token, userCookies } = parseCookies();

    async function getBalance() {
      if (userCookies !== undefined && token !== undefined) {
        const objectUser = JSON.parse(userCookies);

        const response = await axios
          .get(`http://localhost:3333/saldo/${objectUser.accountId}`, {
            headers: { Authorization: token },
          })
          .then((response) => {
            return response.data;
          });

        setBalance(response.balance);
      }
    }
    getBalance();
  }, []);

  return (
    <header className="sticky z-10 w-full top-0 px-8 min-h-[96px] bg-black shadow-md">
      <nav className="flex justify-between items-center py-2">
        <div className="flex items-center justify-between flex-grow">
          <Image src="/logo.png" alt="Logo NG.CASH" width={160} height={30} />
          {open ? (
            <div onClick={() => setOpen(false)}>
              <X
                size={20}
                className={`text-white ml-auto mr-4 lg:hidden`}
                weight="bold"
              />
            </div>
          ) : (
            <div onClick={() => setOpen(true)}>
              <List
                size={20}
                className={`text-white ml-auto mr-4 lg:hidden`}
                weight="bold"
              />
            </div>
          )}
        </div>

        <div
          className={`${
            open ? "block" : "hidden"
          } bg-white lg:bg-transparent fixed top-24 left-auto right-8 rounded-2xl overflow-auto pt-2 shadow-md lg:static lg:flex items-stretch lg:pb-1 mr-1`}
        >
          <div className="lg:flex lg:items-stretch lg:justify-start lg:mr-auto">
            <p className="bg-transparent p-4 lg:p-0 lg:py-2 lg:px-3 font-bold text-lg lg:text-white ">
              {username?.toUpperCase()}
              FELIPE
            </p>
            <p className="bg-transparent p-4 lg:p-0 lg:py-2 lg:px-3 font-bold text-lg lg:text-white">
              SALDO: R$ {balance}
            </p>
            <p className="bg-transparent p-4 lg:p-0 lg:py-2 lg:px-3 font-bold text-lg lg:text-white lg:hover:text-zinc-300 transition-colors cursor-pointer">
              SAIR
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
}
