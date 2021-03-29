import { Box, Divider, Heading, Link, Wrap, WrapItem } from "@chakra-ui/layout";
import React from "react";
import useAuth from "../../hooks/useAuth";
import { PathNamesWithoutUser, SPACING_IN_PX } from "../../utils/constants";
import InternalLink from "../link/InternalLink";
import Container from "./Container";
import ProfileMenu from "./header/ProfileMenu";
import { PathNames } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
const { ROOT } = PathNames;

const Header = () => {
	const { isLoggedIn } = useAuth();
	const router = useRouter();
	const isPathNameWithoutUser = PathNamesWithoutUser.includes(router.pathname);
	const { t } = useTranslation();

	const showProfileMenu = isLoggedIn && !isPathNameWithoutUser;
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
						<WrapItem>{showProfileMenu && <ProfileMenu />}</WrapItem>
					</Wrap>
				</Box>
			</Container>
			<Divider />
		</header>
	);
};

export default Header;
