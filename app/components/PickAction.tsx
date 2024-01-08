"use client";
import Image from "next/image";
import CheckBox from "./CheckBox";
import { NodeData, updateNodesData } from "../redux/slices/sourceBoxSlice";
import { useAppDispatch } from "../redux/store";

type Props = {
  node: NodeData;
};

export default function PickAction({ node }: Props) {
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    if (node) {
      const updatedNode = {
        ...node,
        position: { x: node.xPos, y: node.yPos },
        data: { ...node.data, open: !node.data.open },
      };
      dispatch(updateNodesData(updatedNode));
    }
  };

  return (
    <div
      onClick={handleOpen}
      className="bg-white cursor-pointer border border-[#EAF2FF] z-10 w-[233px] flex justify-between items-center py-2 px-3 rounded-t "
    >
      <p className="text-stone-700 text-sm cursor-pointer">Виберіть значення</p>
      <Image
        src={node.data.open ? "./svg/up.svg" : "./svg/down.svg"}
        alt="arrow"
        width={24}
        height={24}
      />
      {node.data.open && <CheckBox node={node} />}
    </div>
  );
}
