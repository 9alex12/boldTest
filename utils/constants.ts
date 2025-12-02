import LinkMethod from "@/components/icons/LinkMethod";
import TerminalMethod from "@/components/icons/TerminalMethod";
import VisaIcon from "@/components/icons/Visa";
import Nequi from "@/components/icons/Nequi";
import Daviplata from "@/components/icons/Daviplata";
import PSEIcon from "@/components/icons/Pse";
import CARD from "@/components/icons/Card";
import Bancolombia from "@/components/icons/Bancolombia";

export const COL_TITLES = [
  "Transacción",
  "Fecha y hora",
  "Método de pago",
  "ID  transacción Bold",
  "Monto",
];

export const TEXT_STATUS = {
  SUCCESSFUL: "Cobro exitoso",
  REJECTED: "Cobro no realizado",
};

export const IconBySalesType = {
  PAYMENT_LINK: LinkMethod,
  TERMINAL: TerminalMethod,
};

export const iconByPaymentMethod = {
  VISA: VisaIcon,
  NEQUI: Nequi,
  DAVIPLATA: Daviplata,
  PSE: PSEIcon,
  CARD: CARD,
  BANCOLOMBIA: Bancolombia,
};
