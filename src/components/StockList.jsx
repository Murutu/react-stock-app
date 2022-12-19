import { useState, useEffect, useContext } from "react";
import {BsFillCaretDownFill, BsFillCaretUpFill} from "react-icons/bs";
import finHub from "../apis/finHub";
import { WatchListContext } from "../context/watchListContext";

const StockList = () => {
  const [stock, setStock] = useState([]);
  const {watchList} = useContext(WatchListContext);
  /*
  logic adding to change color based on whether it was positive/negative
  */

  const changeColor = (change) => {
    return change > 0 ? "success" : "danger";
  }

  const renderIcon = (change) => {
    return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />
  }
  
  /*
    To avoid calling setStock(response.data) on a component that is unmounted
    We do :
    let isMounted = true
    if(isMounted) {
        setStock(response.data)
    }
    return () => (isMounted = false)
    */

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const responses = [];
      try {
        const responses = await Promise.all(
          watchList.map((stock) => {
            return finHub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
          
        );

        
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });

        if (isMounted) {
          setStock(data);
        }
      } catch (err) {}
    };
    fetchData();

    /*
    We do this when the component gets unmounted
    In order to avoid calling setStock on unmounted component

    Added ? before .map to ask if the array existed
     */

    /*
    <tbody>
     Since this is react we have to provide a key for each element we return 
      Here the key I will use the symbol 
    */
    return () => (isMounted = false);
  }, [watchList]); // every time a stock gets added the watchList is updated

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(79,89,102)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">pClose</th>
          </tr>
        </thead>

      

        <tbody>
         {stock?.map((stockData) => {
          return (
            <tr className="table-row" key={stockData.symbol}>
              <th className="row">{stockData.symbol}</th>
              <td>{stockData.data.c}</td>
              <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d}
              {renderIcon(stockData.data.d)}</td>
              <td className={`text-${changeColor(stockData.data.dp)}`}>{stockData.data.dp}
              {renderIcon(stockData.data.d)}</td>
              <td>{stockData.data.h}</td>
              <td>{stockData.data.l}</td>
              <td>{stockData.data.o}</td>
              <td>{stockData.data.pc}</td>
            </tr>
          )
         })}
        </tbody>
      </table>
    </div>
  );
};
export default StockList;
