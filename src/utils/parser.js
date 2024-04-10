import {uuidv4} from "./utils.js";


export function incomeParserData(incomeData) {
 return incomeData.map((income) => {
        return {
            fiscalDateEnding:income.fiscalDateEnding,
            netIncome:parseInt(income.netIncome,10),
            totalRevenue:parseInt(income.totalRevenue,10),
            reportedCurrency:income.reportedCurrency,
            id:uuidv4(),
        };
    });

}
export function balanceParserData(balanceData) {
 return balanceData.map((balance) => {
        return {
            fiscalDateEnding:balance.fiscalDateEnding,
            totalShareholderEquity:parseInt(balance.totalShareholderEquity,10),
        };
    });

}
export function symbolOptionsParserData(symbols) {
    return symbols.map((item) => {
       return {
           label: item.name,
           value: item.symbol,
       };
   });
}
