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
import { CookieNames, PathNames, REDIRECT_PARAM } from "../utils/constants";
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

const login = () => {
	const dispatch = useDispatch();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const router = useRouter();
	const redirect = useRedirectParam();

	const credentialsEntered = username.length > 0 && password.length > 0;

	const handleLogIn = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void> => {
		e.preventDefault();
		if (credentialsEntered) {
			saveCookie(COOKIE_CONSENT, true, true);
			await dispatch(logIn(username, password));
			await router.push(redirect);
		}
	};

	return (
		<Container>
			<Box borderRadius="lg" borderWidth="1px" p="6">
				<form onSubmit={(e) => handleLogIn(e)}>
					<SimpleGrid columns={1} spacing={6}>
						<Heading>Login</Heading>
						<Text color="gray.500">
							Enter username and password to continue.
						</Text>
						<FormControl id="username" isRequired>
							<FormLabel>Username</FormLabel>
							<Input
								placeholder="Enter Username"
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel>Password</FormLabel>
							<PasswordInput
								//@ts-ignore
								placeholder="Enter Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<FormHelperText>
								<InternalLink href="#">Forgot Password?</InternalLink>
							</FormHelperText>
						</FormControl>
						<Button disabled={!credentialsEntered} type="submit">
							Log In
						</Button>
						<Divider />
						<FormControl id="signup">
							<FormLabel>Don't have an Account?</FormLabel>
							<InternalLink href={`${SIGNUP}?${REDIRECT_PARAM}=${redirect}`}>
								<Button variant="outline" style={{ width: "100%" }}>
									Sign Up
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
