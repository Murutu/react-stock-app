import { useState, useEffect } from "react";
import finHub from "../apis/finHub";

const StockList = () => {
  const [stock, setStock] = useState();
  /*When we send request to the finhub api it expects everything to be in caps */
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

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

        console.log(responses);
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });
        console.log(data);
        if (isMounted) {
          setStock(data);
        }
      } catch (err) {}
    };
    fetchData();

    /*
    We do this when the component gets unmounted
    In order to avoid calling setStock on unmounted component
     */
    return () => (isMounted = false);
  }, []);

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
          {stock.map((stockData) => {
            return (
              <tr className="table-row" key={stockData.symbol}>
                <th scope="row">{stockData.symbol}</th>
                <td>{stockData.data.c}</td>
                <td>{stockData.data.d}</td>
                <td>{stockData.data.dp}</td>
                <td>{stockData.data.h}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>{stockData.data.pc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default StockList;
