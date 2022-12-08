import { useState, useEffect } from "react";
import finHub from "../apis/finHub";

const StockList = () => {
  /*When we send request to the finhub api it expects everything to be in caps */
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await finHub.get("/quote", {
          params: {
            symbol: "MSFT",
          },
        });
        console.log(response);
      } catch (err) {}
    };
    fetchData();
  }, []);

  return <div>StockList</div>;
};
export default StockList;
