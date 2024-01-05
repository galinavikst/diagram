import Image from "next/image";
import { useContext } from "react";
import { BoxContext } from "./Box";

export default function Select() {
  const { boxState, setBoxState } = useContext(BoxContext);

  const handleOpen = () => {
    setBoxState((prevState) => ({
      ...prevState,
      open: !prevState.open,
    }));
  };

  return (
    <div
      onClick={handleOpen}
      className="cursor-pointer bg-white z-10 w-[233px] flex justify-between items-center py-2 px-3 rounded border border-[#479F76]"
    >
      <p className="text-stone-700 text-sm">{boxState?.selectedValue}</p>
      <Image src="./svg/down.svg" alt="arrow" width={24} height={24} />
    </div>
  );
}
