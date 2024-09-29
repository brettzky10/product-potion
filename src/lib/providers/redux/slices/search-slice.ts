import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type ProductStateProps = {
  id: string
  name: string
  category: string | null //Category
  storeId: string
  //category: string; 
  priceInCents: number;
  //discountCodes: string[];
  description: string;
  isAvailableForPurchase: boolean;
  quantity: number;
  //size: Size;
  //color: Color;
  imagePath: string;
  createdAt: Date;
}

type InitialStateProps = {
  isSearching?: boolean
  status?: number | undefined
  data: ProductStateProps[]
  debounce?: string
}

const InitialState: InitialStateProps = {
  isSearching: false,
  status: undefined,
  data: [],
  debounce: "",
}

export const Search = createSlice({
  name: "search",
  initialState: InitialState,
  reducers: {
    onSearch: (state, action: PayloadAction<InitialStateProps>) => {
      return { ...action.payload }
    },
    onClearSearch: (state) => {
      state.data = []
      state.isSearching = false
      state.status = undefined
      state.debounce = ""
    },
  },
})

export const { onSearch, onClearSearch } = Search.actions
export default Search.reducer
