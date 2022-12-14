/*
resolution: 30 minutes
const currentTime = Math.floor(date.getTime()/1000); => The API expects it in seconds 
so we use Math.floor to remove any decimals the /1000 to get it in seconds
*/

import {useEffect} from "react";
import { useParams } from "react-router-dom"
import finHub from "../apis/finHub";

const StockDetailPage = () => {

  const { symbol } = useParams();

 useEffect(() => {

  const fetchData = async () => {
    const date = new Date()
      const currentTime = Math.floor(date.getTime() / 1000)
      let oneDay;
      if (date.getDay() === 6) {
        oneDay = currentTime - 2 * 24 * 60 * 60;
      } else if (date.getDay() === 0) {
        oneDay = currentTime - 3 * 24 * 60 * 60;
      } else {
        oneDay = currentTime - 24 * 60 * 60;
      }
      const oneWeek = currentTime - 7 * 24 * 60 * 60
      const oneYear = currentTime - 365 * 24 * 60 * 60

      try {
        const responses = await Promise.all([
          finHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneDay,
              to: currentTime,
              resolution: 30
            }
          }),
          finHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60
            }
          }),
          finHub.get("/stock/candle", {
            params: {
              symbol,
                from: oneYear,
                to: currentTime,
                resolution: "W"
            }
          })
        ])
        console.log(responses);
      }catch(err) {
        console.log(err);
      }
  }
  fetchData();
 },[]);

  return <div>StockDetailPage {symbol}</div>;
};
export default StockDetailPage;