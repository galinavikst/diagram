"use client";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  NodeData,
  createEdge,
  createNode,
  removeEdges,
  removeNodes,
} from "../redux/slices/sourceBoxSlice";
import { BoxContext } from "./Box";
import { useContext } from "react";
import { MarkerType } from "reactflow";

type Props = {};

export default function CheckBox({}: Props) {
  const dispatch = useAppDispatch();
  const { nodesData, edgesData } = useAppSelector((state) => state.source);
  const { boxState, setBoxState } = useContext(BoxContext);

  const updateFlow = (boxId: string) => {
    // delete all nodes / edges what is created later by arr order
    const clickedNodeIndex = nodesData.findIndex((node) => node.id === boxId);
    const updatedNodes = nodesData.filter((_node, i) => i <= clickedNodeIndex);

    // checks whether both the source and target nodes
    // are present in the filtered array of nodes (updatedNodes).
    // If both nodes are present,
    // it means the edge connects nodes are not removed
    const updatedEdges = edgesData.filter((edge) => {
      const sourceIndex = updatedNodes.findIndex(
        (node) => node.id === edge.source
      );
      const targetIndex = updatedNodes.findIndex(
        (node) => node.id === edge.target
      );
      return sourceIndex !== -1 && targetIndex !== -1;
    });

    dispatch(removeNodes(updatedNodes));
    dispatch(removeEdges(updatedEdges));
  };

  const updateReduxState = (value: string, boxId: string) => {
    // add new node / edge
    const lastNode = nodesData[nodesData.length - 1];
    const actualNode = nodesData.find((node) => node.id === boxId);

    if (actualNode) {
      const posY = actualNode.position.y + 200;
      const posX = actualNode.position.x + 200;

      const newNode: NodeData = {
        id: String(+lastNode.id + 1),
        position: { x: posX, y: posY },
        zIndex: lastNode.zIndex - 1,
        haveCheckedOption: false,
        data: {
          open: false,
          selectedValue: "Вибрати значення",
          options: actualNode.data.options.map((_option, i) => {
            return value + -(i + 1);
          }),
        },
        type: "sourceBox",
      };

      const newEdge = {
        id: `${actualNode.id}-${newNode.id}`,
        source: actualNode.id,
        target: newNode.id,
        type: "smoothstep",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };

      dispatch(createNode(newNode));
      dispatch(createEdge(newEdge));
    }
  };

  const handleOptionClick = (value: string, boxId: string) => {
    // set individual state for node
    setBoxState((prevState) => ({
      ...prevState,
      selectedValue: value,
      haveCheckedOption: true,
    }));

    updateFlow(boxId);
    updateReduxState(value, boxId);
  };
  return (
    <ul className="overflow-hidden drop-shadow-[0_18px_27px_rgba(4,20,32,0.10)] absolute top-[100%] flex flex-col divide-y divide-[#EAF2FF] border rounded-b box-content border-[#EAF2FF] w-full left-[-1px]">
      {boxState.options.map((el) => (
        <li
          key={el}
          onClick={() => handleOptionClick(el, boxState.id)}
          className="p-3 bg-white hover:bg-gray-100"
        >
          <label
            htmlFor={el}
            className="cursor-pointer flex gap-3 items-center text-stone-700 text-sm"
          >
            <input
              className="flex justify-center items-center appearance-none border border-blue-300 size-4 rounded-sm checked:bg-blue-300"
              id={el}
              name={el}
              type="checkbox"
              defaultChecked={boxState.selectedValue === el}
            />
            {el}
          </label>
        </li>
      ))}
    </ul>
  );
}
