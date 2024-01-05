"use client";
import Image from "next/image";
import CheckBox from "./CheckBox";
import { useContext } from "react";
import { BoxContext } from "./Box";

type Props = {};

export default function PickAction({}: Props) {
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
      className="bg-white cursor-pointer border border-[#EAF2FF] z-10 w-[233px] flex justify-between items-center py-2 px-3 rounded-t "
    >
      <p className="text-stone-700 text-sm cursor-pointer">Виберіть значення</p>
      <Image
        src={boxState.open ? "./svg/up.svg" : "./svg/down.svg"}
        alt="arrow"
        width={24}
        height={24}
      />
      {boxState.open && <CheckBox />}
    </div>
  );
}
