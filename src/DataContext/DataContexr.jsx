import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const KEY = process.env.REACT_APP_KEY;
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      //   const res = await axios.get(
      //     `${DOMAIN}/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${KEY}`
      //   );
      //   console.log("res", res);
      // setStockData(res.data["Time Series (Daily)"]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
