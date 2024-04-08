

export function incomeParserData(incomeData) {
 return incomeData.map((income) => {
        return {
            fiscalDateEnding:income.fiscalDateEnding,
            netIncome:parseInt(income.netIncome,10),
            totalRevenue:parseInt(income.totalRevenue,10),
            reportedCurrency:income.reportedCurrency,
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

