import Image from "next/image";
import { List } from "phosphor-react";

export function Header() {
  return (
    <header className="sticky z-10 w-full top-0 px-8 min-h-[96px] bg-black shadow-md">
      <nav className="flex justify-between items-center py-2">
        <div className="flex items-center justify-between flex-grow">
          <Image src="/logo.png" alt="Logo NG.CASH" width={160} height={30} />
          <List
            size={20}
            className="text-white ml-auto mr-4 lg:hidden"
            weight="bold"
          />
        </div>

        <div className="fixed top-24 left-auto right-8 rounded-2xl overflow-auto pt-2 shadow-md lg:static lg:flex items-stretch lg:pb-1 mr-1">
          <div className="lg:flex lg:items-stretch lg:justify-start lg:mr-auto">
            <p className="bg-transparent p-4 lg:p-0 lg:py-2 lg:px-3 font-bold text-lg lg:text-white">
              PEDRO
            </p>
            <p className="bg-transparent p-4 lg:p-0 lg:py-2 lg:px-3 font-bold text-lg lg:text-white">
              SALDO: R$ 100,00
            </p>
            <p className="bg-transparent p-4 lg:p-0 lg:py-2 lg:px-3 font-bold text-lg lg:text-white">
              SAIR
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
}
