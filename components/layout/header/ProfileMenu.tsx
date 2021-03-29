import { Avatar } from "@chakra-ui/avatar";
import {
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuList,
} from "@chakra-ui/menu";
import React from "react";
import useAuth from "./../../../hooks/useAuth";
import { useRouter } from "next/dist/client/router";
import { useDispatch } from "react-redux";
import { logOut } from "../../../actions/authActions";
import { PathNames } from "../../../utils/constants";
import { useTranslation } from "react-i18next";
import ProfileMenuItem from "./ProfileMenuItem";
const { ROOT } = PathNames;

const ProfileMenu = () => {
	const { t } = useTranslation();
	const { fullName, user } = useAuth();
	const dispatch = useDispatch();
	const router = useRouter();

	const handleLogOut = async () => {
		await dispatch(logOut());
		await router.push(ROOT);
	};

	return (
		<Menu autoSelect={false}>
			<MenuButton>
				<Avatar name={fullName} src={user.avatar} />
			</MenuButton>
			<MenuList>
				<MenuGroup title={fullName}>
					<ProfileMenuItem href="/me" text={t("user:menu.account")} />
					<ProfileMenuItem
						onClick={handleLogOut}
						text={t("user:logout.title")}
					/>
				</MenuGroup>
				<MenuDivider />
				<MenuGroup title={t("user:menu.about")}>
					<ProfileMenuItem
						href="https://github.com/lukasweidich/project-x"
						text={t("user:menu.code")}
					/>
					<ProfileMenuItem
						href="https://github.com/lukasweidich/project-x#readme"
						text={t("user:menu.readme")}
					/>
					<MenuDivider />
					<ProfileMenuItem
						href="https://github.com/lukasweidich/project-x/issues"
						text={t("user:menu.bug")}
					/>
				</MenuGroup>
			</MenuList>
		</Menu>
	);
};

export default ProfileMenu;
