import React from "react";
import { IconButton } from "@chakra-ui/button";
import { RepeatClockIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
	const { i18n } = useTranslation();
	const { language } = i18n;

	const handleLanguageChange = (language) => {
		i18n.changeLanguage(language);
	};

	return (
		<IconButton
			aria-label="test"
			icon={<RepeatClockIcon />}
			onClick={() => handleLanguageChange(language === "en" ? "de" : "en")}
		/>
	);
};

export default LanguageSelector;
