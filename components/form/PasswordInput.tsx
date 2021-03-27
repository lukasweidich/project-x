import { IconButton } from "@chakra-ui/button";
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

	const ariaLabelForIconButton = `Click to ${
		showPassword ? "hide" : "show"
	} password.`;

	return (
		<InputGroup>
			<Input {...props} type={showPassword ? "text" : "password"} />
			<InputRightElement>
				<IconButton
					size="xs"
					tabIndex={-1}
					aria-label={ariaLabelForIconButton}
					onClick={handleClick}
					icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
				/>
			</InputRightElement>
		</InputGroup>
	);
};

export default PasswordInput;
