import React from "react";
import { MenuItem } from "@chakra-ui/menu";
import InternalLink from "./../../link/InternalLink";
import ExternalLink from "./../../link/ExternalLink";

const ProfileMenuItem = ({
	href,
	text,
	...rest
}: {
	href?: string;
	text: string;
	[key: string]: any;
}) => {
	const isHrefPassed = !!href && href.length > 0;
	const isInternalLink = isHrefPassed && href.startsWith("/");

	const Wrapper = ({ ...props }) =>
		React.cloneElement(
			isHrefPassed ? (
				isInternalLink ? (
					<InternalLink />
				) : (
					<ExternalLink />
				)
			) : (
				<></>
			),
			{ ...props },
		);

	return (
		<Wrapper href={href}>
			<MenuItem {...rest}>{text}</MenuItem>
		</Wrapper>
	);
};

export default ProfileMenuItem;
