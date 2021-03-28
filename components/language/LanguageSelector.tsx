import React, { useEffect } from "react";
import { Button } from "@chakra-ui/button";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setLanguage } from "./../../actions/languageActions";
import useLanguage from "./../../hooks/useLanguage";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { SUPPORTED_LANGUAGES } from "../../utils/constants";
import CountryFlag from "./CountryFlag";
import { getCountryFromLanguage } from "./../../reducers/i18nReducer";

const LanguageSelector = () => {
	const { i18n } = useTranslation();
	const { language: languageFromState, country } = useLanguage();
	const dispatch = useDispatch();

	useEffect(() => {
		handleLanguageChange(languageFromState);
	}, [languageFromState]);

	const handleLanguageChange = (language) => {
		i18n.changeLanguage(language);
		dispatch(setLanguage(language));
	};

	return (
		<Menu>
			<MenuButton as={Button}>
				<CountryFlag country={country} />
			</MenuButton>
			<MenuList>
				{SUPPORTED_LANGUAGES.filter(
					(language) => language !== languageFromState,
				).map((language, i) => (
					<MenuItem onClick={() => handleLanguageChange(language)} key={i}>
						<CountryFlag country={getCountryFromLanguage(language)} />
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
};

export default LanguageSelector;
