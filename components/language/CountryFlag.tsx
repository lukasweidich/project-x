import React from "react";
import { Country } from "../../reducers/i18nReducer";
import ReactCountryFlag from "react-country-flag";

const CountryFlag = ({ country }: { country: Country }) => (
	<ReactCountryFlag countryCode={country} />
);
export default CountryFlag;
