import React, { useEffect, useState } from "react";
import { Avatar, AvatarGroup } from "@chakra-ui/avatar";
import { SPACING_IN_PX } from "../../utils/constants";
import { Box } from "@chakra-ui/react";
import { GroupInterface } from "./../../db/types/Group";
import InternalLink from "./../link/InternalLink";
import { Heading } from "@chakra-ui/layout";
import { Tooltip, Skeleton, SimpleGrid, Container } from "@chakra-ui/react";
import { getUser } from "../../utils/api";
import useAuth from "../../hooks/useAuth";
import { UserInterface } from "./../../db/types/User";

const GroupPreview = ({ group }: { group: GroupInterface }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [members, setMembers] = useState<Array<UserInterface>>([]);
	const { token } = useAuth();

	useEffect(() => {
		const init = async () => {
			const members = await Promise.all(
				group.members.map(async (memberId) => await getUser(memberId, token)),
			);
			setMembers(members);
			setLoading(false);
		};
		init();
	}, [token]);

	return (
		<InternalLink href={`#${group._id}`}>
			<Container>
				<Box borderRadius="lg" borderWidth="1px" p={SPACING_IN_PX}>
					<SimpleGrid columns={1} spacing={SPACING_IN_PX}>
						<Heading isTruncated size="md">
							{group.name}
						</Heading>
						{loading ? (
							<Skeleton isLoaded={!loading} height="12" />
						) : (
							<AvatarGroup max={3}>
								{members.map((member) => {
									const fullName = `${member.firstName} ${member.lastName}`;
									return (
										<Tooltip label={fullName}>
											<Avatar src={member.avatar} name={fullName} />
										</Tooltip>
									);
								})}
							</AvatarGroup>
						)}
					</SimpleGrid>
				</Box>
			</Container>
		</InternalLink>
	);
};

export default GroupPreview;
