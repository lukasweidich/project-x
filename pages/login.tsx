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
import { useDispatch } from "react-redux";
import { saveCookie } from "../utils/cookies";
import { logIn } from "../actions/authActions";
import {
	CookieNames,
	PathNames,
	REDIRECT_PARAM,
	SPACING_IN_PX,
} from "../utils/constants";
import { useRouter } from "next/dist/client/router";
import useRedirectParam from "../hooks/useRedirectParam";
import {
	FormControl,
	FormHelperText,
	FormLabel,
} from "@chakra-ui/form-control";
import InternalLink from "../components/link/InternalLink";
const { COOKIE_CONSENT } = CookieNames;
const { SIGNUP } = PathNames;
import { useTranslation } from "react-i18next";

const login = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loggingIn, setLoggingIn] = useState<boolean>(false);

	const router = useRouter();
	const redirect = useRedirectParam();

	const credentialsEntered = username.length > 0 && password.length > 0;

	const handleLogIn = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void> => {
		e.preventDefault();
		if (credentialsEntered) {
			setLoggingIn(true);
			saveCookie(COOKIE_CONSENT, true, true);
			await dispatch(logIn(username, password));
			await router.push(redirect);
			setLoggingIn(false);
		}
	};

	return (
		<Container>
			<Box borderRadius="lg" borderWidth="1px" p={SPACING_IN_PX}>
				<form onSubmit={(e) => handleLogIn(e)}>
					<SimpleGrid columns={1} spacing={6}>
						<Heading>{t("userAuth:login.title")}</Heading>
						<Text color="gray.500">{t("userAuth:login.desc")}</Text>
						<FormControl id="username" isRequired>
							<FormLabel>{t("userAuth:attributes.username.label")}</FormLabel>
							<Input
								placeholder={t("userAuth:attributes.username.placeholder")}
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel>{t("userAuth:attributes.password.label")}</FormLabel>
							<PasswordInput
								//@ts-ignore
								placeholder={t("userAuth:attributes.password.placeholder")}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<FormHelperText>
								<InternalLink href="#">
									{t("userAuth:login.forgotPassword")}
								</InternalLink>
							</FormHelperText>
						</FormControl>
						<Button
							disabled={!credentialsEntered}
							type="submit"
							isLoading={loggingIn}
							loadingText="Logging In"
						>
							{t("userAuth:login.title")}
						</Button>
						<Divider />
						<FormControl id="signup">
							<FormLabel>{t("userAuth:signup.cta")}</FormLabel>
							<InternalLink href={`${SIGNUP}?${REDIRECT_PARAM}=${redirect}`}>
								<Button variant="outline" style={{ width: "100%" }}>
									{t("userAuth:signup.title")}
								</Button>
							</InternalLink>
						</FormControl>
					</SimpleGrid>
				</form>
			</Box>
		</Container>
	);
};

export default login;
