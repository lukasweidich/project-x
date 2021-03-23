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
import { PathNames, REDIRECT_PARAM } from "../utils/constants";
const { LOGIN } = PathNames;

const signup = () => {
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [repeatPassword, setRepeatPassword] = useState<string>("");

	const router = useRouter();
	const redirect = useRedirectParam();

	const passwordsMatch = password.localeCompare(repeatPassword) === 0;

	const credentialsEntered =
		firstName.length > 0 &&
		lastName.length > 0 &&
		username.length > 0 &&
		password.length > 0 &&
		passwordsMatch;

	const handleLogIn = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void> => {
		e.preventDefault();
		if (credentialsEntered) {
			await createUserInDb(firstName, lastName, username, password);
			await router.push(redirect);
		}
	};

	return (
		<Container>
			<Box borderRadius="lg" borderWidth="1px" p="6">
				<form onSubmit={(e) => handleLogIn(e)}>
					<SimpleGrid columns={1} spacing={6}>
						<Heading>Sign Up</Heading>
						<Text color="gray.500">Enter your information.</Text>
						<FormControl id="firstname" isRequired>
							<FormLabel>First Name</FormLabel>
							<Input
								placeholder="Enter First Name"
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								required
							/>
						</FormControl>
						<FormControl id="lastname" isRequired>
							<FormLabel>Last Name</FormLabel>
							<Input
								placeholder="Enter Last Name"
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								required
							/>
						</FormControl>
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
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel>Repeat Password</FormLabel>
							<PasswordInput
								//@ts-ignore
								isInvalid={!passwordsMatch}
								placeholder="Enter Password again"
								value={repeatPassword}
								onChange={(e) => setRepeatPassword(e.target.value)}
								required
							/>
						</FormControl>
						<Button disabled={!credentialsEntered} type="submit">
							Sign Up
						</Button>
						<Divider />
						<FormControl id="signup">
							<FormLabel>Already have an Account?</FormLabel>
							<InternalLink href={`${LOGIN}?${REDIRECT_PARAM}=${redirect}`}>
								<Button variant="outline" style={{ width: "100%" }}>
									Log In
								</Button>
							</InternalLink>
						</FormControl>
					</SimpleGrid>
				</form>
			</Box>
		</Container>
	);
};

export default signup;
