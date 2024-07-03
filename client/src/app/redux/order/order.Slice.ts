import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: any = {
  list: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToCart: (state , action: PayloadAction<any>) => {
      const checkExist = state.list.find((ele: any)=> ele._id === action.payload._id)
      if(checkExist){
        state.list = state.list.map((ele : any)=>{
          if(ele._id === action.payload._id){
            let { __typename, ...rest } = ele;
            return {...rest, quantity : rest.quantity + 1}
          }else{
            let { __typename, ...rest } = ele;
            return rest
          }
        })
      }else{
        let { __typename, ...rest } = action.payload;
        state.list = [...state.list,rest];
      }
    },
    removeFromCart: (state , action: PayloadAction<any>) => {
        state.list = state.list.filter((ele: any) => ele._id !== action.payload)
    },
  },
});

export const { addToCart, removeFromCart } = orderSlice.actions;
export default orderSlice.reducer;
