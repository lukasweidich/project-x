import { Box, Divider, Link, Text } from "@chakra-ui/layout";
import React from "react";
import { SPACING_IN_PX } from "../../utils/constants";
import ExternalLink from "../link/ExternalLink";
import ToggleThemeButton from "../theme/ToggleThemeButton";
import Container from "./Container";

const Header = () => {
	return (
		<header>
			<Container>
				<Box marginTop={SPACING_IN_PX} marginBottom={SPACING_IN_PX}>
					Header
				</Box>
			</Container>
			<Divider />
		</header>
	);
};

export default Header;
