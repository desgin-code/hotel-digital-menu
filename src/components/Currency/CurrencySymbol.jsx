import { useSelector } from "react-redux";

function CurrencySymbol() {
  const hotel = useSelector((state) => state.hotel.hotel);

  const currencySymbol = hotel?.hotel_currency?.currency_symbol ?? "₹";

  return <span>{currencySymbol}</span>;
}

export default CurrencySymbol;
