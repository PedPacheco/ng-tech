import { X } from "phosphor-react";

interface ModalDateProps {
  openDateModal: boolean;
  setOpenDateModal: (value: boolean) => void;
  date: string;
  setDate: (value: string) => void;
  month: string;
  setMonth: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
  catchFilteredTransactions: (filter: string) => void;
}

export function ModalDate({
  date,
  catchFilteredTransactions,
  openDateModal,
  setDate,
  setOpenDateModal,
  setMonth,
  month,
  setYear,
  year,
}: ModalDateProps) {
  return (
    <div
      className={`${
        openDateModal ? "block" : "hidden"
      } fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white shadow-xl w-[380px] h-36 rounded border-2`}
    >
      <X
        size={24}
        weight="bold"
        className="mt-2 ml-2 cursor-pointer"
        onClick={() => setOpenDateModal(false)}
      />
      <div className="flex flex-col w-[90%] mx-auto items-center justify-center">
        <div className="flex items-center justify-around py-2 w-full">
          <input
            className="border-2 border-zinc-300 text-center rounded w-24"
            placeholder="Dia"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <input
            className="border-2 border-zinc-300 text-center  rounded w-24"
            placeholder="Mês"
            value={month}
            onChange={(event) => setMonth(event.target.value)}
          />
          <input
            className="border-2 border-zinc-300 text-center rounded w-24"
            placeholder="Ano"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
        </div>
        <button
          className="items-end w-[80%] bg-black text-white rounded mt-4 hover:bg-zinc-900 transition-colors py-1"
          onClick={() => catchFilteredTransactions("transacoes-data")}
        >
          Filtrar por data
        </button>
      </div>
    </div>
  );
}
