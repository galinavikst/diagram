"use client";
import Select from "./Select";
import PickAction from "./PickAction";
import { Handle, NodeProps, Position } from "reactflow";

export default function Box(props: NodeProps) {
  return (
    <>
      {props && (
        <div>
          <Handle type="target" position={Position.Top} />
          <Handle
            className={
              !props.data.haveCheckedOption || props.data.open
                ? "opacity-0"
                : ""
            }
            type="source"
            position={props.id === "1" ? Position.Bottom : Position.Right}
          />

          <div className="flex flex-col items-center justify-end gap-1 py-1 px-0.5 w-60 h-36 bg-[#D1E7DD] rounded">
            <div className="h-[72px] w-full bg-white rounded"></div>
            {props.data.open ? (
              <PickAction node={props} />
            ) : (
              <Select node={props} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
