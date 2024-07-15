import create from "zustand";

interface FormulaState {
  formulas: string[];
  addTag: (tag: string) => void;
  removeTag: (index: number) => void;
}

export const useFormulaStore = create<FormulaState>((set) => ({
  formulas: [],
  addTag: (tag) =>
    set((state) => ({
      formulas: [...state.formulas, tag],
    })),
  removeTag: (index) =>
    set((state) => ({
      formulas: state.formulas.filter((_, i) => i !== index),
    })),
}));
