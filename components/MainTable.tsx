"use client";

import { useState } from "react";
import SearchIcon from "./icons/SearchIcon";
import { formatDate, formatMoney, addAsterisks } from "@/utils/formaters";
import { Transaction } from "@/app/page";
import { COL_TITLES, TEXT_STATUS, IconBySalesType, iconByPaymentMethod } from "@/utils/constants";

const MainTable = ({
  data = [],
  title,
  setSelectedTransaction,
}: {
  data: Transaction[];
  title: string;
  setSelectedTransaction: (transaction: Transaction) => void;
}) => {
  const [query, setQuery] = useState("");

  const filteredData = (data: Transaction[], query: string) => {
    if (!query) return data;

    const lowerQuery = query.toLowerCase();

    return data?.filter((item) => {
      const textStatus = TEXT_STATUS[item.status];

      const itemValues = [
        ...Object.values(item),
        formatDate(item.createdAt),
        textStatus,
        item.paymentMethod === "CARD" ? "tarjeta" : item.paymentMethod,
      ];
      return itemValues.some((value) => {
        return String(value).toLowerCase().includes(lowerQuery);
      });
    });
  };

  const dataFiltered = filteredData(data, query);

  return (
    <div className="mx-8 rounded-xl overflow-hidden ">
      <h3 className="bg-bold-gradient p-4 text-white">{title}</h3>
      <label className="flex p-3 gap-3 bg-white cursor-text">
        <SearchIcon width="32" height="32" className="opacity-30" />
        <input
          type="search"
          name=""
          id=""
          placeholder="Buscar"
          className="w-full outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div>
        <table className="w-full table-auto border-collapse bg-white">
          <thead>
            <tr>
              {COL_TITLES?.map((title) => {
                return (
                  <th
                    key={title}
                    className="text-left p-4 bg-bold-gray-lightest font-normal"
                  >
                    {title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {dataFiltered &&
              dataFiltered?.map((item) => {
                const IconComponent = IconBySalesType[item.salesType];
                const PaymentIconComponent =
                  iconByPaymentMethod[item.paymentMethod];
                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedTransaction(item)}
                    className="hover:bg-bold-gray-light/50 cursor-pointer h-20 max-h-20 border-t hover:bg-bold-gray-lightest border-l-4 border-l-[#C5C5C5] even:border-l-bold-blue"
                    data-testid={`main-table-row-${item.id}`}
                  >
                    <td className="px-2 text-bold-blue font-semibold ">
                      <div className="h-full flex gap-3" data-testid={`main-table-status-${item.id}`}> 
                        <IconComponent className="inline-block mr-2" />
                        {TEXT_STATUS?.[item.status]}
                      </div>
                    </td>
                    <td className="px-2" data-testid={`main-table-date-${item.id}`}>{formatDate(item.createdAt)}</td>
                    <td className="px-2" data-testid={`main-table-reference-${item.id}`}> 
                      {PaymentIconComponent && (
                        <PaymentIconComponent className="inline-block mr-2" />
                      )}
                      {addAsterisks(item.transactionReference)}
                    </td>
                    <td className="px-2" data-testid={`main-table-id-${item.id}`}>{item.id}</td>
                    <td className="px-2" data-testid={`main-table-amount-${item.id}`}> 
                      <h3 className="text-bold-blue font-semibold">
                        {formatMoney(item.amount)}
                      </h3>
                      {item.deduction && (
                        <>
                          <p className="text-sm text-[#C5C5C5] font-bold">Deducción Bold</p>
                          <span className="text-sm text-bold-red" data-testid={`main-table-deduction-${item.id}`}>-{formatMoney(item.deduction)}</span>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainTable;
