import React from "react";

const ExternalLink = ({
	href = "",
	children = <></>,
	...rest
}: {
	href?: string;
	children?: string | React.ReactNode;
	[key: string]: any;
}) => {
	return (
		<a href={href} {...rest} target="_blank" rel="noopener noreferrer">
			{children}
		</a>
	);
};

export default ExternalLink;
