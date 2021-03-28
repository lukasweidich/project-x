import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./../../actions/themeActions";
import { InitialStoreInterface } from "./../../store";
import { useTranslation } from "react-i18next";

const ToggleThemeButton = () => {
	const { t } = useTranslation();

	const { colorMode: colorModeFromState } = useSelector(
		(state: InitialStoreInterface) => state.theme,
	);

	const { colorMode, toggleColorMode, setColorMode } = useColorMode();
	const dispatch = useDispatch();

	useEffect(() => {
		setColorMode(colorModeFromState);
	}, [colorModeFromState]);

	const handleToggleColorMode = () => {
		toggleColorMode();
		dispatch(setTheme(colorMode === "dark" ? "light" : "dark"));
	};

	return (
		<IconButton
			aria-label={t("common:actions.switch-theme")}
			onClick={handleToggleColorMode}
			icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
		/>
	);
};

export default ToggleThemeButton;
