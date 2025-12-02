import Home from "@/views/Home";

export interface Transaction {
  id: string;
  status: "REJECTED" | "SUCCESSFUL";
  paymentMethod: "NEQUI" | "PSE" | "CARD";
  salesType: "TERMINAL" | "PAYMENT_LINK";
  createdAt: number;
  transactionReference: number;
  amount: number;
  deduction: number;
}

interface ApiResponse {
  data: Transaction[];
}
export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const timeRange = searchParams?.timeRange || "month";
  const res = await fetch("https://bold-fe-api.vercel.app/api");
  const { data }: ApiResponse = await res.json();
  const date = new Date();

  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const thisWeek = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 7
  );

  const thisMonth = new Date(
    date.getFullYear(),
    date.getMonth() - 1,
    date.getDate()
  );

  const timestamps = {
    today: today.getTime(),
    week: thisWeek.getTime(),
    month: thisMonth.getTime(),
  };

  const dataByTime = data.reduce(
    (acum, curr) => {
      if (curr.createdAt > timestamps[timeRange as keyof typeof timestamps]) {
        acum.data.push(curr);
        acum.total += curr.amount;
      }

      return acum;
    },
    { total: 0, data: [] as Transaction[] }
  );

  const monthName = new Intl.DateTimeFormat("es-CO", { month: "long" }).format(
    date
  );
  const year = new Intl.DateTimeFormat("es-CO", { year: "numeric" }).format(
    date
  );

  return <Home data={dataByTime} monthName={monthName} year={year} />;
}
