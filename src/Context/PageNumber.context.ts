import { createContext } from "react";

interface IPageNumberContextType {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
}

const initalValue:IPageNumberContextType={
 pageNumber: 1,
  setPageNumber: () => {},
}

export const pageNumberContext = createContext(initalValue);
