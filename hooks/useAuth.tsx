import { useSelector } from "react-redux";
import { InitialStoreInterface } from "./../store";
import { UserInterface } from "./../db/types/User";
import { InitialAuthReducerStateInterface } from "./../reducers/authReducer";

interface UseAuthInterface {
	user: UserInterface;
	token: string;
	isLoggedIn: boolean;
	fullName: string;
}

const useAuth = (): UseAuthInterface => {
	const { user, token }: InitialAuthReducerStateInterface = useSelector(
		(state: InitialStoreInterface) => state.auth,
	);
	return {
		user,
		token,
		isLoggedIn: !!user && !!token,
		fullName: `${user?.firstName} ${user?.lastName}`,
	};
};

export default useAuth;
