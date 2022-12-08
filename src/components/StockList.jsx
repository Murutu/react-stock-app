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

  return <div>StockList</div>;
};
export default StockList;
