import { useSelector } from "react-redux";
import { InitialStoreInterface } from "./../store";
import { UserInterface } from "./../db/types/User";

interface UseAuthInterface {
	user: UserInterface;
	token: string;
}

const useAuth = (): UseAuthInterface => {
	const { user, token }: UseAuthInterface = useSelector(
		(state: InitialStoreInterface) => state.auth,
	);
	return { user, token };
};

export default useAuth;
