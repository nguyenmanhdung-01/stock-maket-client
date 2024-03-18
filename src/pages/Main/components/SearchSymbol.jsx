import axios from "axios";
import React, { useState } from "react";
import moment from "moment-timezone";
import Button from "../../../components/Buttons/Button";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import LoadingPage from "../../../components/LoadingPage";
import EmptyState from "../../../components/EmptyState/EmptyState";
import Card from "../../../components/Card";

const SearchSymbol = ({ setSymbol, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  const [arraySymbol, setArraySymbol] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://alpha-vantage.p.rapidapi.com/query?keywords=${keywords}&function=SYMBOL_SEARCH&datatype=json
            `,
        {
          headers: {
            "X-RapidAPI-Key":
              "3048a1d1dfmshdde3ab6f776dd11p1b67e3jsnfd550c9178c7",
            "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
          },
        }
      );
      //   console.log("results:", res);
      setArraySymbol(res.data.bestMatches);
      setLoading(false);
    } catch (error) {}
  };

  const onKeywordChange = (event) => {
    setKeywords(event.target.value);
  };

  const convertToVietnameseTime = (time, timezone) => {
    if (selectedTimezone === "Vietnam" && timezone !== "UTC") {
      const timeInUTC = moment.utc(time, "HH:mm").tz(timezone);
      const timeInVietnam = timeInUTC.clone().tz("Asia/Ho_Chi_Minh");
      return timeInVietnam.format("HH:mm");
    }
    return time;
  };
  return (
    <Card>
      <form action="" className="text-center">
        <input
          onChange={onKeywordChange}
          type="text"
          className="w-full border border-gray-600 px-3 py-2 text-black rounded-md mb-2 text-base"
          placeholder="Search Symbols ..."
        />
        <Button
          type={"button"}
          title={"Tìm kiếm"}
          icon={<FontAwesomeIcon className="mr-2" icon={faMagnifyingGlass} />}
          className={"bg-blue-600 text-white"}
          onClick={() => onSubmit()}
        />
      </form>
      {arraySymbol.length > 0 ? (
        loading ? (
          <LoadingPage />
        ) : (
          <div className="border-b border-blue-400 rounded-[20px] mt-2 px-2 py-1 shadow-xl">
            <table className=" w-full text-base bg-white dark:!bg-navy-800 dark:text-white">
              <thead>
                <tr>
                  <th className=" px-2 text-center">Mã chứng khoán</th>
                  <th className=" px-2 text-center">Công ty/ Tập đoàn</th>
                  <th className=" px-2 text-center">Loại</th>
                  <th className=" px-2 text-center">Khu vực</th>
                  <th className=" px-2 text-center">Giờ mở cửa</th>
                  <th className=" px-2 text-center">Giờ đóng cửa</th>
                  <th className=" px-2 text-center">
                    <select
                      name=""
                      id=""
                      value={selectedTimezone}
                      onChange={(e) => setSelectedTimezone(e.target.value)}
                      className="w-[80px] dark:bg-navy-800 "
                    >
                      <option value="">Múi giờ</option>
                      <option value="Vietnam">Việt Nam</option>
                    </select>
                  </th>
                  <th className=" px-2 text-center">Tiền tệ</th>
                </tr>
              </thead>
              <tbody>
                {arraySymbol.map((item, inx) => (
                  <tr
                    key={inx}
                    onClick={() => {
                      setSymbol(`${item["1. symbol"]}`);
                      setOpen(false);
                    }}
                  >
                    <td className=" py-2 px-2 text-center">
                      {item["1. symbol"]}
                    </td>
                    <td className=" py-2 px-2 text-center">
                      {item["2. name"]}
                    </td>
                    <td className=" py-2 px-2 text-center">
                      {item["3. type"] === "Equity" ? "Cổ phiếu" : ""}
                    </td>
                    <td className=" py-2 px-2 text-center">
                      {item["4. region"]}
                    </td>
                    <td className=" py-2 px-2 text-center">
                      {selectedTimezone === "Vietnam"
                        ? convertToVietnameseTime(
                            item["5. marketOpen"],
                            item["7. timezone"]
                          )
                        : item["5. marketOpen"]}
                    </td>
                    <td className=" py-2 px-2 text-center">
                      {selectedTimezone === "Vietnam"
                        ? convertToVietnameseTime(
                            item["6. marketClose"],
                            item["7. timezone"]
                          )
                        : item["6. marketClose"]}
                    </td>
                    <td className=" py-2 px-2 text-center">
                      {selectedTimezone === "Vietnam"
                        ? "UTC+07"
                        : item["7. timezone"]}
                    </td>
                    <td className=" py-2 px-2 text-center">
                      {item["8. currency"]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <EmptyState />
      )}
    </Card>
  );
};

export default SearchSymbol;
