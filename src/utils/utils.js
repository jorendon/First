export default function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

export  function currencyFormatter({ currency, value}) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        minimumFractionDigits: 2,
        currency
    })
    return formatter.format(value)
}

var normalizeDate = function(date) {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date;
};


export function dateFormatted (dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
}).format(normalizeDate(date));

};


export function findShareHolder(balance,fiscalDateEnding){
    return balance.find(item => item.fiscalDateEnding === fiscalDateEnding);
}
