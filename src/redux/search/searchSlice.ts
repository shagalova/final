import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IDocData, IHistogramData, IObjectIds } from '../../types';


// Define a type for the slice state
interface ISearchState {
  isLoading: boolean;
  histogramData: IHistogramData[] | null;
  objectIds: string[] | null;
  documents: IDocData[] | [];
  isLoadingDocuments: boolean;

}

// Define the initial state using that type
const initialState = {
  isLoading: false,
  histogramData: null,
  objectIds: null,
  documents: [],
  isLoadingDocuments: false,

} as ISearchState

const searchSlice = createSlice({
  
  name: "search",
  initialState,
  reducers: {
      isLoading(state) {
        state.isLoading = true;
         
        },

      isReady(state) {
        state.isLoading = false;
       
      },

      setHistogramData(state,action: PayloadAction<ISearchState["histogramData"]>) {
        state.histogramData = action.payload
      },

      setObjectIds(state,action: PayloadAction<Array<string> | null>) {
        
        if (!state.objectIds) {
          state.objectIds = null
        }
        state.objectIds = action.payload
      },

      setDocuments(state,action: PayloadAction<IDocData>) {
        
        state.documents = [...state.documents,action.payload]
      },

      clearDocuments(state) {
        state.documents = []
      },

      isLoadingDoc(state,action: PayloadAction<boolean>) {
        state.isLoadingDocuments = action.payload
      }


  },
});

export const { isLoading, isReady, setHistogramData, setObjectIds, setDocuments, clearDocuments, isLoadingDoc } = searchSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const selectState = (state: RootState) => state.search.isLoading;
export const selectHistogramData = (state: RootState) => state.search.histogramData;
export const selectId = (state: RootState) => state.search.objectIds;
export const selectDocuments = (state: RootState) => state.search.documents;
export const selectIsLoadingDoc = (state: RootState) => state.search.isLoadingDocuments;

export default searchSlice.reducer;