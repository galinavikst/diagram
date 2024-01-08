import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { NodeChange, applyNodeChanges } from "reactflow";

type customOptions = {
  open: boolean;
  selectedValue: string;
  haveCheckedOption: boolean;
  options: string[];
};

export interface NodeData {
  id: string;
  xPos?: number;
  yPos?: number;
  position?: { x: number; y: number };
  type: string;
  data: customOptions;
  zIndex: number;
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
      type: "sourceBox",
      position: { x: 50, y: 50 },
      zIndex: 0,
      data: {
        open: false,
        haveCheckedOption: false,
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
    updateNodesData: (state, action) => {
      state.nodesData = state.nodesData.map((node) =>
        node.id === action.payload.id ? action.payload : node
      );
    },
    removeNodes: (state, action) => {
      state.nodesData = action.payload;
    },
    removeEdges: (state, action) => {
      state.edgesData = action.payload;
    },

    onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
      const updatedNodes = applyNodeChanges(action.payload, state.nodesData);
      state.nodesData = updatedNodes;
    },
  },
});

export const {
  createNode,
  createEdge,
  removeNodes,
  removeEdges,
  updateNodesData,
  onNodesChange,
} = sourceSlice.actions;

export default sourceSlice.reducer;
