import { ArrowRight } from "phosphor-react";

export function Transaction() {
  return (
    <li className="my-10">
      <div className="flex justify-between items-center w-full">
        <p className="font-bold text-xl">Transferência Recebida</p>
        <span className="font-semibold text-zinc-400 text-sm">02/06/2022</span>
      </div>
      <div className="ml-3 mt-3 flex items-center justify-between">
        <div className="flex flex-col items-start justify-center">
          <p className="font-medium text-xl">Pedro</p>
          <p className="font-medium text-xl">- R$ 60,00</p>
        </div>

        <ArrowRight size={56} className="font-medium text-xl text-green-400" />

        <div className="flex flex-col items-start justify-center">
          <p className="font-medium text-xl">Felipe</p>
          <p className="font-medium text-xl">+ R$ 60,00</p>
        </div>
      </div>
    </li>
  );
}
