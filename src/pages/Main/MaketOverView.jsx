import React, { useEffect } from "react";
import useDarkSide from "../../useDarkSide";

const MarketOverviewWidget = () => {
  const [colorTheme] = useDarkSide();
  // console.log("ăn");
  useEffect(() => {
    if (document.querySelector(".tradingview-widget-container script")) {
      return;
    }
    console.log("colorTheme", colorTheme);
    // Thêm mã nhúng TradingView vào DOM khi component được render
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = `
      {
        "colorTheme":"${colorTheme}",
        "showChart": true,
        "locale": "vi_VN",
        "largeChartUrl": "",
        "isTransparent": false,
        "showSymbolLogo": true,
        "showFloatingTooltip": true,
        "width": "100%",
        "height": "100%",
        "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
        "plotLineColorFalling": "rgba(41, 98, 255, 1)",
        "gridLineColor": "rgba(240, 243, 250, 0)",
        "scaleFontColor": "rgba(106, 109, 120, 1)",
        "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
        "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
        "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
        "tabs": [
            {
              "title": "Chỉ số",
              "symbols": [
                {
                  "s": "FOREXCOM:SPXUSD",
                  "d": "S&P 500"
                },
                {
                  "s": "FOREXCOM:NSXUSD",
                  "d": "US 100"
                },
                {
                  "s": "FOREXCOM:DJI",
                  "d": "Dow 30"
                },
                {
                  "s": "INDEX:NKY",
                  "d": "Nikkei 225"
                },
                {
                  "s": "INDEX:DEU40",
                  "d": "DAX Index"
                },
                {
                  "s": "FOREXCOM:UKXGBP",
                  "d": "UK 100"
                },
                {
                  "s": "HNX:HNXINDEX",
                  "d": "VND"
                }
              ],
              "originalTitle": "Chỉ số"
            },
            {
              "title": "Tương lai",
              "symbols": [
                {
                  "s": "CME_MINI:ES1!",
                  "d": "S&P 500"
                },
                {
                  "s": "CME:6E1!",
                  "d": "Euro"
                },
                {
                  "s": "COMEX:GC1!",
                  "d": "Gold"
                },
                {
                  "s": "NYMEX:CL1!",
                  "d": "Oil"
                },
                {
                  "s": "NYMEX:NG1!",
                  "d": "Gas"
                },
                {
                  "s": "CBOT:ZC1!",
                  "d": "Corn"
                },
                {
                  "s": "HNX:HNXINDEX"
                }
              ],
              "originalTitle": "Tương lai"
            },
            {
              "title": "Trái phiếu",
              "symbols": [
                {
                  "s": "CME:GE1!",
                  "d": "Eurodollar"
                },
                {
                  "s": "CBOT:ZB1!",
                  "d": "T-Bond"
                },
                {
                  "s": "CBOT:UB1!",
                  "d": "Ultra T-Bond"
                },
                {
                  "s": "EUREX:FGBL1!",
                  "d": "Euro Bund"
                },
                {
                  "s": "EUREX:FBTP1!",
                  "d": "Euro BTP"
                },
                {
                  "s": "EUREX:FGBM1!",
                  "d": "Euro BOBL"
                },
                {
                  "s": "HNX:HNXINDEX",
                  "d": "VND"
                }
              ],
              "originalTitle": "Trái phiếu"
            },
            {
              "title": "Ngoại hối",
              "symbols": [
                {
                  "s": "FX:EURUSD",
                  "d": "EUR to USD"
                },
                {
                  "s": "FX:GBPUSD",
                  "d": "GBP to USD"
                },
                {
                  "s": "FX:USDJPY",
                  "d": "USD to JPY"
                },
                {
                  "s": "FX:USDCHF",
                  "d": "USD to CHF"
                },
                {
                  "s": "FX:AUDUSD",
                  "d": "AUD to USD"
                },
                {
                  "s": "FX:USDCAD",
                  "d": "USD to CAD"
                },
                {
                  "s": "HNX:HNXINDEX",
                  "d": "VND to USD"
                }
              ],
              "originalTitle": "Ngoại hối"
            }
          ]
      }
    `;
    document.querySelector(".tradingview-widget-container").appendChild(script);
  }, [colorTheme]);

  return (
    <div className="tradingview-widget-container w-full">
      <div className="tradingview-widget-container__widget overflow-x-auto"></div>
    </div>
  );
};

export default MarketOverviewWidget;
