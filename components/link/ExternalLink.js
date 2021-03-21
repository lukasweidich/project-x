import React from "react";

const ExternalLink = ({ href = "", children, ...rest }) => {
	return (
		<a href={href} {...rest} target="_blank" rel="noopener noreferrer">
			{children}
		</a>
	);
};

export default ExternalLink;
