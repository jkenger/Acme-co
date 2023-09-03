import { createContext, ReactElement, useState, useEffect } from "react";

// Interface for products   @shareable
export interface IProducts {
  products: IProduct[];
}

// Interface for product    @shareable
export interface IProduct {
  id: number;
  name: string;
  price: number;
}

// Interface for children   @private
interface IChildren {
  children?: React.ReactNode | ReactElement[];
}

// Initial state for products have an interface of Products
const initialState: IProducts = { products: [] };

// Initial state for product have an interface of Product
const initialProduct: IProduct[] = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
  },
];

// Create context for products have a generic type of Products
export const ProductsContext = createContext<IProducts>(initialState);

// Create provider for products have a children interface on props, and a return type of ReactElement
const ProductsProvider = ({ children }: IChildren): ReactElement => {
  const [products, setProducts] = useState<IProduct[]>(initialProduct);

  useEffect(() => {
    setProducts(initialProduct);
  }, []);
  // useEffect(() => {
  //   async function fetchProduct(): Promise<IProduct[]> {
  //     const data = await fetch("http://localhost:3500/products")
  //       .then((res) => res.json())
  //       .catch((err) => console.log(err));
  //     return data;
  //   }
  //   // fetch products from api or any other source to set a new state
  //   fetchProduct().then((data) => {
  //     setProducts(data);
  //     console.log(data);
  //   });
  // }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { ProductsProvider };
