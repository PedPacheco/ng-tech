import { useState } from "react";

interface TransactionProps {
  handleTransfer: (username: string, amount: number | undefined) => void;
}

export function SendTransaction({ handleTransfer }: TransactionProps) {
  const [username, setUsername] = useState<string>("");
  const [amount, setAmount] = useState<number>();

  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <div className="w-full lg:h-80 bg-black mb-auto mt-auto">
        <div className="h-full flex flex-col justify-between items-center">
          <h1 className="text-white justify-center text-3xl font-medium mt-6">
            FAZER TRANSFERÊNCIA
          </h1>

          <p className="text-[hsla(0,0%,100%,.9)] my-4 text-lg">
            Faça uma transferência para outro usuario NG
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-between w-full">
            <div className="w-64 lg:w-auto flex justify-center items-center flex-col mx-auto lg:ml-auto lg:mr-16 py-4">
              <span className="text-[hsla(0,0%,100%,.9)] text-center lg:text-lg font-light">
                Usuário para enviar a tranferênica:
              </span>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-56 lg:w-60 h-8 lg:h-10 mt-3 rounded-lg border-2 pl-2 border-zinc-700"
              />
            </div>
            <div className="w-64 lg:w-auto flex justify-center items-center flex-col mx-auto lg:mr-auto lg:ml-16 py-4">
              <span className="text-[hsla(0,0%,100%,.9)] font-light lg:text-lg">
                Valor da tranferênica:
              </span>
              <input
                type="number"
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
                className="w-56 lg:w-60 h-8 lg:h-10 mt-3 rounded-lg border-2 pl-2 border-zinc-700"
              />
            </div>
          </div>

          <button
            onClick={() => handleTransfer(username, amount)}
            className="w-64 lg:w-[480px] h-8 lg:h-10 text-zinc-900 text-lg bg-white border-2 border-zinc-500 hover:text-zinc-600 transition-colors flex items-center justify-center py-1 mt-4 mb-10 rounded-xl font-medium"
          >
            Transferir
          </button>
        </div>
      </div>
    </div>
  );
}
