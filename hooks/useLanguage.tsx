import { useSelector } from "react-redux";
import { InitialStoreInterface } from "./../store";
import { InitialI18nReducerStateInterface } from "../reducers/i18nReducer";

const useLanguage = (): InitialI18nReducerStateInterface => {
	const { country, language }: InitialI18nReducerStateInterface = useSelector(
		(state: InitialStoreInterface) => state.i18n,
	);
	return {
		language,
		country,
	};
};

export default useLanguage;
