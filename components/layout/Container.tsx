import React from "react";

const Container = ({
	children,
	spacingTopAndBottom = false,
	paddingInPx = 42,
	...props
}) => {
	return (
		<div className="container" {...props}>
			{children}
			<style jsx>{`
				.container {
					height: 100%;
					width: 100%;
					padding: ${spacingTopAndBottom ? paddingInPx : 0}px ${paddingInPx}px;
					margin-right: auto;
					margin-left: auto;
				}
				@media (max-width: 575px) {
					.container {
						max-width: calc(100vw - ${paddingInPx * 2}px) !important;
					}
				}
				@media (min-width: 576px) {
					.container {
						max-width: calc(540px - ${paddingInPx * 2}px) !important;
					}
				}
				@media (min-width: 768px) {
					.container {
						max-width: calc(720px - ${paddingInPx * 2}px) !important;
					}
				}
				@media (min-width: 992px) {
					.container {
						max-width: calc(960px - ${paddingInPx * 2}px) !important;
					}
				}
				@media (min-width: 1200px) {
					.container {
						max-width: calc(1140px - ${paddingInPx * 2}px) !important;
					}
				}
			`}</style>
		</div>
	);
};

export default Container;
