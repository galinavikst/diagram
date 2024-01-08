"use client";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  NodeData,
  createEdge,
  createNode,
  removeEdges,
  removeNodes,
  updateNodesData,
} from "../redux/slices/sourceBoxSlice";
import { MarkerType } from "reactflow";

type Props = {
  node: NodeData;
};

export default function CheckBox({ node }: Props) {
  const dispatch = useAppDispatch();
  const { nodesData, edgesData } = useAppSelector((state) => state.source);

  // delete all nodes / edges what is created later by arr order
  const updateFlow = () => {
    const clickedNodeIndex = nodesData.findIndex((n) => n.id === node.id);
    const updatedNodes = nodesData.filter((_node, i) => i <= clickedNodeIndex);
    console.log(clickedNodeIndex);

    // checks whether both the source and target nodes
    // are present in the filtered array of nodes (updatedNodes).
    // If both nodes are present,
    // it means the edge connects nodes are not removed
    const updatedEdges = edgesData.filter((edge) => {
      const sourceIndex = updatedNodes.findIndex((n) => n.id === edge.source);
      const targetIndex = updatedNodes.findIndex((n) => n.id === edge.target);
      return sourceIndex !== -1 && targetIndex !== -1;
    });

    dispatch(removeNodes(updatedNodes));
    dispatch(removeEdges(updatedEdges));
  };

  // update actual node in redux state when shoosing value
  const updateSingleNodeInState = (value: string) => {
    const updatedActualNode = {
      ...node,
      position: { x: node.xPos, y: node.yPos },
      data: {
        ...node.data,
        open: false,
        haveCheckedOption: true,
        selectedValue: value,
      },
    };
    dispatch(updateNodesData(updatedActualNode));
  };

  // add new node / edge
  const updateReduxState = (value: string) => {
    if (node.xPos && node.yPos) {
      const newNode: NodeData = {
        id: String(+node.id + 1),
        position: { x: node.xPos + 200, y: node.yPos + 200 },
        zIndex: node.zIndex - 1,
        data: {
          open: false,
          selectedValue: "Вибрати значення",
          haveCheckedOption: false,
          options: node.data.options.map((_option, i) => {
            return value + -(i + 1);
          }),
        },
        type: "sourceBox",
      };

      const newEdge = {
        id: `${node.id}-${newNode.id}`,
        source: node.id,
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

  const handleOptionClick = (e: React.MouseEvent, selectedValue: string) => {
    e.stopPropagation();

    if (selectedValue !== node.data.selectedValue) {
      updateFlow();
      updateReduxState(selectedValue);
    }

    updateSingleNodeInState(selectedValue);
  };
  return (
    <ul className="overflow-hidden drop-shadow-[0_18px_27px_rgba(4,20,32,0.10)] absolute top-[100%] flex flex-col divide-y divide-[#EAF2FF] border rounded-b box-content border-[#EAF2FF] w-full left-[-1px]">
      {node.data.options.map((el) => (
        <li
          key={el}
          onClick={(e) => handleOptionClick(e, el)}
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
              defaultChecked={node.data.selectedValue === el}
            />
            {el}
          </label>
        </li>
      ))}
    </ul>
  );
}
