
import {create} from 'zustand';

export const useProductStore = create((set)=>({
    
  currproducts:[],
  setcurrProducts: (products)=> set(()=> ({currproducts:[...products]}))

}))



