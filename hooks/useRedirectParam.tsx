import { useRouter } from "next/dist/client/router";
import { PathNames, REDIRECT_PARAM } from "../utils/constants";
const { ROOT } = PathNames;

const useRedirectParam = (): string => {
	const router = useRouter();
	const urlParams = new URLSearchParams(router.asPath.split("?")[1]);
	const redirect = urlParams.get(REDIRECT_PARAM) ?? ROOT;
	return redirect;
};

export default useRedirectParam;
