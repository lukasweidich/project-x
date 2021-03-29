import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setLanguage } from "./../../actions/languageActions";
import useLanguage from "./../../hooks/useLanguage";
import { SUPPORTED_LANGUAGES } from "../../utils/constants";
import { Select } from "@chakra-ui/react";
import useIsClientSide from "../../hooks/useIsClientSide";
import { Language } from "../../reducers/i18nReducer";

const LanguageSelector = () => {
	const { i18n } = useTranslation();
	const { language: languageFromState } = useLanguage();
	const dispatch = useDispatch();
	const isClientSide = useIsClientSide();

	useEffect(() => {
		handleLanguageChange(languageFromState);
	}, [languageFromState]);

	const handleLanguageChange = (language) => {
		i18n.changeLanguage(language);
		dispatch(setLanguage(language));
	};

	/**
	 * since correct language is set on client side, do not render on server side, as it only shows the default language
	 */
	return (
		isClientSide && (
			<Select
				onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
					handleLanguageChange(e.target.value)
				}
				value={languageFromState}
			>
				{SUPPORTED_LANGUAGES.sort(
					(a: Language, b: Language) =>
						Number(a === languageFromState) - Number(b === languageFromState),
				).map((language: Language, i) => (
					<option key={i} value={language}>
						{language.toUpperCase()}
					</option>
				))}
			</Select>
		)
	);
};

export default LanguageSelector;
