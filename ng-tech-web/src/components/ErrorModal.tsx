import { Warning } from "phosphor-react";
interface ModalErrorProps {
  message: string;
  title: string;
  errorIsTrue: boolean;
  setErrorIsTrue: (value: boolean) => void;
}

export function ModalError({
  message,
  title,
  errorIsTrue,
  setErrorIsTrue,
}: ModalErrorProps) {
  return (
    <div
      className={`${
        errorIsTrue ? "block" : "hidden"
      } fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white shadow-xl w-[420px] h-52 rounded border-2`}
    >
      <div className="flex w-full mx-auto items-center justify-center">
        <div className="flex flex-col items-center justify-around py-2 w-full">
          <Warning size={60} className="text-red-600" />
          <h1 className="font-semibold text-xl">{title}</h1>
          <p className="font-medium mt-4">{message}</p>
          <button
            className="w-12 h-8 bg-black text-white transition-colors rounded mt-6"
            onClick={() => setErrorIsTrue(false)}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
