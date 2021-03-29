import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const InternalLink = ({
	href = "",
	children = "",
	...rest
}: {
	href?: string;
	children?: string | React.ReactNode;
	[key: string]: any;
}) => {
	const router = useRouter();

	const className = router.pathname === href ? "active" : "";

	return (
		<Link href={href} {...rest}>
			<a href={href} className={className} {...rest}>
				{children}
			</a>
		</Link>
	);
};

export default InternalLink;
