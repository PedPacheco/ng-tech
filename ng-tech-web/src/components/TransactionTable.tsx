import { FunnelSimple, X } from "phosphor-react";
import { ChangeEvent, useState } from "react";
import InputMask from "react-input-mask";
import { Transaction } from "./Transaction";

export function TransactionTable() {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openDateModal, setOpenDateModal] = useState<boolean>(false);
  const [date, setDate] = useState<string>();

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
                onClick={() => setOpenDateModal(true)}
              >
                DATA
              </p>
              <p className="p-4 font-bold text-lg text-white hover:bg-zinc-700 transition-colors">
                CASH-IN
              </p>
              <p className="p-4 font-bold text-lg text-white hover:bg-zinc-700 transition-colors">
                CASH-OUT
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center px-6 w-full">
          <ul className="w-full my-4">
            <Transaction />
            <Transaction />
            <Transaction />
            <Transaction />
            <Transaction />
            <Transaction />
          </ul>
        </div>
      </div>

      <div
        className={`${
          openDateModal ? "block" : "hidden"
        } fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white shadow-xl w-52 h-36 rounded border-2`}
      >
        <X
          size={24}
          weight="bold"
          className="mt-2 ml-2 cursor-pointer"
          onClick={() => setOpenDateModal(false)}
        />
        <div className="flex flex-col items-center py-4">
          <InputMask
            mask="99/99/9999"
            className="border-2 border-zinc-300 text-center"
            placeholder="DD/MM/YYYY"
            value={date}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setDate(event.target.value)
            }
          />
          <button className="items-end w-[80%] bg-black text-white rounded mt-4 hover:bg-zinc-900 transition-colors py-1">
            Filtrar por data
          </button>
        </div>
      </div>
    </section>
  );
}
