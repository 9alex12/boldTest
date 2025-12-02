"use client";
import InformationCard from "@/components/InformationCard";
import TableTabs from "@/components/TableTabs";
import Filter from "@/components/Filter";
import MainTable from "@/components/MainTable";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Transaction } from "@/app/page";
import SideModal from "@/components/SideModal";

const OPTIONS_FILTER = [
  { label: "Cobro con datáfono", value: "TERMINAL" },
  { label: "Cobro con link de pago", value: "PAYMENT_LINK" },
  { label: "Ver todos", value: "ALL" },
];

const Home = ({
  data,
  monthName,
  year,
}: {
  data: { total: number; data: Transaction[] };
  monthName: string;
  year: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeRange = searchParams.get("timeRange") || "month";
  const methodType = searchParams.get("methodType")?.split(",") || [];
  const [selectedTransaction, setSelectedTransaction] = useState(
    {} as Transaction | null
  );
  console.log({ selectedTransaction });

  const setParam = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const OPTIONS_TIME = [
    { label: "hoy", value: "today" },
    { label: "esta semana", value: "week" },
    { label: monthName, value: "month" },
  ];
  const OPTIONS_TIME_OBJ = Object.groupBy(OPTIONS_TIME, (x) => x.value);

  const dataFiltered = useMemo(() => {
    if (!methodType.length || methodType.includes("ALL")) {
      return data;
    }
    const dataFilter = data.data.filter((item) => {
      return methodType.includes(item.salesType);
    });
    return { ...data, data: dataFilter };
  }, [data, methodType]);


  return (
    <>
      <section className="flex gap-3 flex-col md:flex-row py-12 px-8">
        <InformationCard
          title={OPTIONS_TIME_OBJ?.[timeRange]?.[0].label as string}
          amount={dataFiltered.total}
          date={
            timeRange === "month"
              ? `${monthName}, ${year}`
              : (OPTIONS_TIME_OBJ?.[timeRange]?.[0].label as string)
          }
        />
        <div className="flex-1 flex flex-col gap-4">
          <TableTabs
            name="selector-time-filter"
            options={OPTIONS_TIME}
            onChange={(e) => setParam("timeRange", e.target.value)}
            defaultValue={timeRange}
          />
          <Filter
            options={OPTIONS_FILTER}
            onSubmit={(values) => setParam("methodType", values.join(","))}
            values={methodType}
          />
        </div>
      </section>
      <MainTable
        data={dataFiltered.data}
        title={`Tus ventas de ${OPTIONS_TIME_OBJ?.[timeRange]?.[0].label}`}
        setSelectedTransaction={setSelectedTransaction}
      />
      <SideModal
        selectedTransaction={selectedTransaction}
        setSelectedTransaction={setSelectedTransaction}
      />
    </>
  );
};

export default Home;
