import { Button } from "@chakra-ui/button";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	Input,
	InputGroup,
	InputProps,
	InputRightElement,
} from "@chakra-ui/input";
import { ComponentWithAs } from "@chakra-ui/system";
import React, { useState } from "react";

const PasswordInput = ({ ...props }: ComponentWithAs<"input", InputProps>) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const handleClick = () => setShowPassword(!showPassword);
	return (
		<InputGroup>
			<Input {...props} type={showPassword ? "text" : "password"} />
			<InputRightElement>
				<Button onClick={handleClick}>
					{showPassword ? <ViewOffIcon /> : <ViewIcon />}
				</Button>
			</InputRightElement>
		</InputGroup>
	);
};

export default PasswordInput;
