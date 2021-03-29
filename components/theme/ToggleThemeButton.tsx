import { IconButton } from "@chakra-ui/button";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "./../../actions/themeActions";
import { useTranslation } from "react-i18next";
import useExtendedColorMode from "../../hooks/useExtendedColorMode";

const ToggleThemeButton = () => {
	const { t } = useTranslation();

	const {
		colorModeFromState,
		setColorMode,
		toggleColorMode,
		isDarkColorMode,
	} = useExtendedColorMode();
	const dispatch = useDispatch();

	useEffect(() => {
		setColorMode(colorModeFromState);
	}, [colorModeFromState]);

	const handleToggleColorMode = () => {
		toggleColorMode();
		dispatch(setTheme(isDarkColorMode ? "light" : "dark"));
	};

	return (
		<IconButton
			aria-label={t("common:actions.switch-theme")}
			onClick={handleToggleColorMode}
			icon={isDarkColorMode ? <SunIcon /> : <MoonIcon />}
		/>
	);
};

export default ToggleThemeButton;
