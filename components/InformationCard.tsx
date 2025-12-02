import GlobeIcon from "./icons/GlobeIcon";
import { formatMoney } from "@/utils/formaters";

const InformationCard = ({
  title,
  amount,
  date,
}: {
  title: string;
  amount: number;
  date: string;
}) => {
  return (
    <div className="max-w-full bg-white md:w-96 border border-gray-200 rounded-xl shadow-md overflow-visible" data-testid="information-card">
      <h3 className="flex justify-between gap-2 bg-bold-gradient p-4 text-white rounded-t-xl relative" data-testid="information-card-title">
        Total de ventas de {title}
        <details
          className="relative group"
          tabIndex={0}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              e.currentTarget.open = false;
            }
          }}
          data-testid="information-card-details"
        >
          <summary className="marker-none list-none cursor-pointer" data-testid="information-card-summary">
            <GlobeIcon className="w-5 h-5" />
          </summary>
          <div
            className="
              absolute
              left-1/2 -translate-x-1/2
              top-full mt-2
              bg-gray-800 text-white text-xs px-2 py-1 rounded
              shadow-lg
              z-50
            "
            data-testid="information-card-tooltip"
          >
            Valor total de todas las transacciones
          </div>
        </details>
      </h3>
      <div className="text-center h-24 rounded-b-xl flex flex-col gap-y-2 pt-6 pb-2" data-testid="information-card-content">
        <h2 className="bg-bold-gradient bg-clip-text text-transparent text-2xl font-semibold" data-testid="information-card-amount">
          {formatMoney(amount)}
        </h2>
        <span className="text-sm capitalize" data-testid="information-card-date">{date}</span>
      </div>
    </div>
  );
};

export default InformationCard;
