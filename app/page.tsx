"use client";
import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./redux/store";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import Box from "./components/Box";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import { onNodesChange } from "./redux/slices/sourceBoxSlice";
import "reactflow/dist/style.css";

// import { persistStore } from "redux-persist";
// persistStore(store); // persist the store if custome storage

export default function Home() {
  const dispatch = useAppDispatch();
  const { nodesData, edgesData } = useAppSelector((state) => state.source);

  const nodeTypes = useMemo(() => ({ sourceBox: Box }), []);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <main className="h-screen w-screen p-12">
        <ReactFlow
          nodes={nodesData}
          onNodesChange={(e) => dispatch(onNodesChange(e))}
          nodeTypes={nodeTypes}
          edges={edgesData}
        ></ReactFlow>
      </main>
    </PersistGate>
  );
}
