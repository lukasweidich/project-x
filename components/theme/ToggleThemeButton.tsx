import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./../../actions/themeActions";
import { InitialStoreInterface } from "./../../store";

const ToggleThemeButton = () => {
	const { colorMode: colorModeFromState } = useSelector(
		(state: InitialStoreInterface) => state.theme,
	);

	useEffect(() => {
		setColorMode(colorModeFromState);
	}, [colorModeFromState]);

	const { colorMode, toggleColorMode, setColorMode } = useColorMode();
	const dispatch = useDispatch();

	const handleToggleColorMode = () => {
		toggleColorMode();
		dispatch(setTheme(colorMode === "dark" ? "light" : "dark"));
	};

	return (
		<Button onClick={handleToggleColorMode}>
			{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
		</Button>
	);
};

export default ToggleThemeButton;
