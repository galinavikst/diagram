import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Options = {
  open: boolean;
  selectedValue: string;
  options: string[];
};

export interface NodeData {
  id: string;
  position: { x: number; y: number };
  type: string;
  data: Options;
  zIndex: number;
  haveCheckedOption: boolean;
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
  type: string;
}

export interface SourceBoxState {
  nodesData: NodeData[];
  edgesData: EdgeData[];
}

const initialState: SourceBoxState = {
  edgesData: [],
  nodesData: [
    {
      id: "1",
      position: { x: 50, y: 50 },
      zIndex: 0,
      data: {
        open: false,
        selectedValue: "Вибрати значення",
        options: [
          "Варіант 1",
          "Варіант 2",
          "Варіант 3",
          "Варіант 4",
          "Варіант 5",
          "Варіант 6",
        ],
      },
      haveCheckedOption: false,
      type: "sourceBox",
    },
  ],
};

export const sourceSlice = createSlice({
  name: "source",
  initialState,
  reducers: {
    createNode: (state, action: PayloadAction<NodeData>) => {
      state.nodesData = [...state.nodesData, action.payload];
    },
    createEdge: (state, action: PayloadAction<EdgeData>) => {
      state.edgesData = [...state.edgesData, action.payload];
    },
    removeNodes: (state, action) => {
      state.nodesData = action.payload;
    },
    removeEdges: (state, action) => {
      state.edgesData = action.payload;
    },
  },
});

export const { createNode, createEdge, removeNodes, removeEdges } =
  sourceSlice.actions;

export default sourceSlice.reducer;
