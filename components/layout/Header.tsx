import { Box, Divider, Heading, Link, Wrap, WrapItem } from "@chakra-ui/layout";
import React from "react";
import useAuth from "../../hooks/useAuth";
import { SPACING_IN_PX } from "../../utils/constants";
import InternalLink from "../link/InternalLink";
import Container from "./Container";
import ProfileMenu from "./header/ProfileMenu";
import { PathNames } from "../../utils/constants";
import { useTranslation } from "react-i18next";
const { ROOT } = PathNames;

const Header = () => {
	const { isLoggedIn } = useAuth();
	const { t } = useTranslation();
	return (
		<header>
			<Container>
				<Box marginTop={SPACING_IN_PX} marginBottom={SPACING_IN_PX}>
					<Wrap align="center" justify="space-between">
						<WrapItem>
							<InternalLink href={ROOT}>
								<Link>
									<Heading>{t("common:app-name")}</Heading>
								</Link>
							</InternalLink>
						</WrapItem>
						<WrapItem>{isLoggedIn && <ProfileMenu />}</WrapItem>
					</Wrap>
				</Box>
			</Container>
			<Divider />
		</header>
	);
};

export default Header;
