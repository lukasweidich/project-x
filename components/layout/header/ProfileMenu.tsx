import { Avatar } from "@chakra-ui/avatar";
import { Link } from "@chakra-ui/layout";
import {
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuList,
} from "@chakra-ui/menu";
import React from "react";
import InternalLink from "../../link/InternalLink";
import useAuth from "./../../../hooks/useAuth";
import ExternalLink from "./../../link/ExternalLink";
import { useRouter } from "next/dist/client/router";
import { useDispatch } from "react-redux";
import { logOut } from "../../../actions/authActions";
import { PathNames } from "../../../utils/constants";
import { useTranslation } from "react-i18next";
const { ROOT } = PathNames;

const ProfileMenu = () => {
	const { t } = useTranslation();
	const { fullName } = useAuth();
	const dispatch = useDispatch();
	const router = useRouter();

	const handleLogOut = async () => {
		await dispatch(logOut());
		await router.push(ROOT);
	};

	return (
		<Menu autoSelect={false}>
			<MenuButton>
				<Avatar name={fullName} />
			</MenuButton>
			<MenuList>
				<MenuGroup title={t("user:menu.profile")}>
					<MenuItem>
						<InternalLink href="/me">
							<Link>{t("user:menu.account")}</Link>
						</InternalLink>
					</MenuItem>
					<MenuItem onClick={handleLogOut}>{t("user:logout.title")}</MenuItem>
				</MenuGroup>
				<MenuDivider />
				<MenuGroup title={t("user:menu.help")}>
					<MenuItem>
						<ExternalLink href="https://github.com/lukasweidich/project-x/issues">
							<Link>{t("user:menu.bug")}</Link>
						</ExternalLink>
					</MenuItem>
				</MenuGroup>
			</MenuList>
		</Menu>
	);
};

export default ProfileMenu;
