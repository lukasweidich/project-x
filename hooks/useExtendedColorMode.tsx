import { useColorMode } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { InitialStoreInterface } from "../store";
import { ColorMode } from "@chakra-ui/color-mode";

interface UseIsExtendedColorModeInterface {
	colorMode: ColorMode;
	toggleColorMode: () => void;
	setColorMode: (value: any) => void;
	colorModeFromState: ColorMode;
	isDarkColorMode: boolean;
	isLightColorMode: boolean;
}

const useExtendedColorMode = (): UseIsExtendedColorModeInterface => {
	const { colorMode: colorModeFromState } = useSelector(
		(state: InitialStoreInterface) => state.theme,
	);

	const { colorMode, toggleColorMode, setColorMode } = useColorMode();
	return {
		colorMode,
		toggleColorMode,
		setColorMode,
		colorModeFromState,
		isDarkColorMode: colorMode === "dark",
		isLightColorMode: colorMode === "light",
	};
};

export default useExtendedColorMode;
