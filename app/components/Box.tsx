"use client";
import Select from "./Select";
import PickAction from "./PickAction";
import { useAppSelector } from "../redux/store";
import { Handle, Position } from "reactflow";
import { useState, createContext, Dispatch, SetStateAction } from "react";

interface BoxState {
  isFirstNode: boolean;
  haveCheckedOption: boolean;
  open: boolean;
  selectedValue: string;
  id: string;
  options: string[];
}

interface BoxContextProps {
  boxState: BoxState;
  setBoxState: Dispatch<SetStateAction<BoxState>>;
}

// set initial boxState
export const BoxContext = createContext<BoxContextProps>({
  boxState: {
    isFirstNode: true,
    haveCheckedOption: false,
    open: false,
    selectedValue: "",
    id: "",
    options: [],
  },
  setBoxState: () => {},
});

export default function Box() {
  const { nodesData } = useAppSelector((state) => state.source);
  const { open, selectedValue, options } = nodesData[nodesData.length - 1].data;

  const [boxState, setBoxState] = useState({
    isFirstNode: nodesData.length === 1,
    haveCheckedOption: nodesData[nodesData.length - 1].haveCheckedOption,
    open,
    selectedValue,
    options,
    id: nodesData[nodesData.length - 1].id,
  });

  return (
    <BoxContext.Provider value={{ boxState, setBoxState }}>
      <>
        <>
          <Handle type="target" position={Position.Top} />
          <Handle
            className={
              !boxState.haveCheckedOption || boxState.open ? "opacity-0" : ""
            }
            type="source"
            position={boxState.isFirstNode ? Position.Bottom : Position.Right}
          />
        </>

        <div className="flex flex-col items-center justify-end gap-1 py-1 px-0.5 w-60 h-36 bg-[#D1E7DD] rounded">
          <div className="h-[72px] w-full bg-white rounded"></div>
          {boxState?.open ? <PickAction /> : <Select />}
        </div>
      </>
    </BoxContext.Provider>
  );
}
