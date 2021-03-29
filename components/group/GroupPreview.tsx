import React from "react";
import { Avatar, AvatarGroup } from "@chakra-ui/avatar";
import { SPACING_IN_PX } from "../../utils/constants";
import { Box } from "@chakra-ui/react";
import { GroupInterface } from "./../../db/types/Group";
import InternalLink from "./../link/InternalLink";
import { Heading } from "@chakra-ui/layout";

const GroupPreview = ({ group }: { group: GroupInterface }) => {
	return (
		<InternalLink href="#">
			<Box borderRadius="lg" borderWidth="1px" p={SPACING_IN_PX}>
				<Heading isTruncated size="md">
					{group.name}
				</Heading>
				<AvatarGroup max={2}>
					{group.members.map((member) => {
						//TODO: add fetching of members
						return <Avatar />;
					})}
				</AvatarGroup>
			</Box>
		</InternalLink>
	);
};

export default GroupPreview;
