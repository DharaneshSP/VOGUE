
import {create} from 'zustand';

interface Product{
  category:string;
  description:string;
  id:string;
  img_url:string;
  name:string;
  price:string;
  seller_id:string;
  tags:string;
}

interface ProductStore {
  currproducts: Product[];
  setcurrProducts: (products: Product[]) => void;
}

export const useProductStore = create<ProductStore>((set)=>({
    
  currproducts:[],
  setcurrProducts: (products)=> set(()=> ({currproducts:[...products]}))

}))



