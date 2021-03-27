import {
	Box,
	Center,
	Divider,
	Flex,
	Link,
	Text,
	Wrap,
	WrapItem,
} from "@chakra-ui/layout";
import React from "react";
import ExternalLink from "./../link/ExternalLink";
import Container from "./Container";
import { SPACING_IN_PX } from "./../../utils/constants";
import ToggleThemeButton from "../theme/ToggleThemeButton";

const Footer = () => {
	return (
		<footer>
			<Divider />
			<Container>
				<Box marginTop={SPACING_IN_PX} marginBottom={SPACING_IN_PX}>
					<Wrap align="center" justify="space-between">
						<WrapItem>
							<Text>
								© {new Date().getFullYear()}{" "}
								<Link>
									<ExternalLink href="https://lukasweidich.de">
										Lukas Weidich
									</ExternalLink>
								</Link>
							</Text>
						</WrapItem>
						<WrapItem>
							<ToggleThemeButton />
						</WrapItem>
					</Wrap>
				</Box>
			</Container>
		</footer>
	);
};

export default Footer;
