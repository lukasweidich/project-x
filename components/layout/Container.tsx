import React from "react";

const Container = ({ children }) => {
	return (
		<div className="container">
			{children}
			<style jsx>{`
				.container {
					height: 100%;
					width: 100%;
					padding-right: 16px;
					padding-left: 16px;
					margin-right: auto;
					margin-left: auto;
				}
				@media (min-width: 576px) {
					.container {
						max-width: 540px !important;
					}
				}
				@media (min-width: 768px) {
					.container {
						max-width: 720px !important;
					}
				}
				@media (min-width: 992px) {
					.container {
						max-width: 960px !important;
					}
				}
				@media (min-width: 1200px) {
					.container {
						max-width: 1140px !important;
					}
				}
			`}</style>
		</div>
	);
};

export default Container;
