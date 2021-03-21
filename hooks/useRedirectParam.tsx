import { useRouter } from "next/dist/client/router";

const useRedirectParam = (): string => {
	const router = useRouter();
	const urlParams = new URLSearchParams(router.asPath.split("?")[1]);
	const redirect = urlParams.get("redirect") ?? "/";
	return redirect;
};

export default useRedirectParam;
