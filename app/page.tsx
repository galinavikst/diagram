"use client";
import React, { useMemo } from "react";
import { useAppSelector } from "./redux/store";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import Box from "./components/Box";
import { useRouter } from "next/navigation";

import "reactflow/dist/style.css";

export default function Home() {
  const nodeTypes = useMemo(() => ({ sourceBox: Box }), []);

  const { nodesData, edgesData } = useAppSelector((state) => state.source);

  return (
    <main className="h-screen w-screen">
      <ReactFlow
        nodes={nodesData}
        nodeTypes={nodeTypes}
        edges={edgesData}
      ></ReactFlow>
    </main>
  );
}
