import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import {
	Box,
	Container,
	Divider,
	Heading,
	SimpleGrid,
	Text,
} from "@chakra-ui/layout";
import React, { useState } from "react";
import PasswordInput from "../components/form/PasswordInput";
import { useRouter } from "next/dist/client/router";
import useRedirectParam from "../hooks/useRedirectParam";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import InternalLink from "../components/link/InternalLink";
import { createUserInDb } from "../utils/api";
import { PathNames, REDIRECT_PARAM, SPACING_IN_PX } from "../utils/constants";
const { LOGIN } = PathNames;
import { useTranslation } from "react-i18next";
import TitleAndDesc from "../components/meta/TitleAndDesc";

const signup = () => {
	const { t } = useTranslation();
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [repeatPassword, setRepeatPassword] = useState<string>("");
	const [signingUp, setSigningUp] = useState<boolean>(false);

	const router = useRouter();
	const redirect = useRedirectParam();

	const passwordsMatch = password.localeCompare(repeatPassword) === 0;

	const credentialsEntered =
		firstName.length > 0 &&
		lastName.length > 0 &&
		username.length > 0 &&
		password.length > 0 &&
		passwordsMatch;

	const handleSignIn = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void> => {
		e.preventDefault();
		if (credentialsEntered) {
			setSigningUp(true);
			await createUserInDb(firstName, lastName, username, password);
			await router.push(redirect);
			setSigningUp(false);
		}
	};

	return (
		<>
			<TitleAndDesc
				title={t("user:signup.title")}
				desc={t("user:signup.desc")}
			/>
			<Container>
				<Box borderRadius="lg" borderWidth="1px" p={SPACING_IN_PX}>
					<form onSubmit={(e) => handleSignIn(e)}>
						<SimpleGrid columns={1} spacing={6}>
							<Heading>{t("user:signup.title")}</Heading>
							<Text>{t("user:signup.desc")}</Text>
							<FormControl id="firstname" isRequired>
								<FormLabel>{t("user:attributes.firstName.label")}</FormLabel>
								<Input
									placeholder={t("user:attributes.firstName.placeholder")}
									type="text"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									required
								/>
							</FormControl>
							<FormControl id="lastname" isRequired>
								<FormLabel>{t("user:attributes.lastName.label")}</FormLabel>
								<Input
									placeholder={t("user:attributes.lastName.placeholder")}
									type="text"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									required
								/>
							</FormControl>
							<FormControl id="username" isRequired>
								<FormLabel>{t("user:attributes.username.label")}</FormLabel>
								<Input
									placeholder={t("user:attributes.username.placeholder")}
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
								/>
							</FormControl>
							<FormControl id="password" isRequired>
								<FormLabel>{t("user:attributes.password.label")}</FormLabel>
								<PasswordInput
									//@ts-ignore
									placeholder={t("user:attributes.password.placeholder")}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</FormControl>
							<FormControl id="repeatPassword" isRequired>
								<FormLabel>
									{t("user:attributes.repeatPassword.label")}
								</FormLabel>
								<PasswordInput
									//@ts-ignore
									isInvalid={!passwordsMatch}
									placeholder={t("user:attributes.repeatPassword.placeholder")}
									value={repeatPassword}
									onChange={(e) => setRepeatPassword(e.target.value)}
									required
								/>
							</FormControl>
							<Button
								disabled={!credentialsEntered}
								type="submit"
								isLoading={signingUp}
							>
								{t("user:signup.title")}
							</Button>
							<Divider />
							<FormControl id="signup">
								<FormLabel>{t("user:login.cta")}</FormLabel>
								<InternalLink href={`${LOGIN}?${REDIRECT_PARAM}=${redirect}`}>
									<Button variant="outline" style={{ width: "100%" }}>
										{t("user:login.title")}
									</Button>
								</InternalLink>
							</FormControl>
						</SimpleGrid>
					</form>
				</Box>
			</Container>
		</>
	);
};

export default signup;
