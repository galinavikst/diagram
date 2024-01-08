import Image from "next/image";
import { useAppDispatch } from "../redux/store";
import { NodeData, updateNodesData } from "../redux/slices/sourceBoxSlice";

type Props = {
  node: NodeData;
};

export default function Select({ node }: Props) {
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
      className="cursor-pointer bg-white z-10 w-[233px] flex justify-between items-center py-2 px-3 rounded border border-[#479F76]"
    >
      <p className="text-stone-700 text-sm">{node.data.selectedValue}</p>
      <Image src="./svg/down.svg" alt="arrow" width={24} height={24} />
    </div>
  );
}
