import {createContext, useState} from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
     /*When we send request to the finHub api it expects everything to be in caps */
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

  // Add a stock

  const addStock = (stock) => {
    if (watchList.indexOf(stock) === -1){
        setWatchList([...watchList, stock]);
    }
  }

  const deleteStock = (stock) => {
    setWatchList(watchList.filter((el) => {
        return el !== stock
    }))
  }

    return (
        <WatchListContext.Provider value={{watchList, addStock, deleteStock}}>
            {props.children}
        </WatchListContext.Provider>
    )
}



