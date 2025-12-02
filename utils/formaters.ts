export const formatDate = (timestamp:number) => {
    if (!timestamp) return "-";
    
    const date = new Date(timestamp);

    const formatted = new Intl.DateTimeFormat("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })?.format(date);
    return formatted
  };

  export const formatMoney = (value:number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  export const addAsterisks = (transactionRef:number) => {
    const string = transactionRef?.toString();
    const result = " **** " + string;
    return result;
  };