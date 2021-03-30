import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../actions/authActions";
import { updateUser } from "../../actions/userActions";
import useAuth from "../../hooks/useAuth";
import { getUser } from "../../utils/api";
import { PathNames } from "../../utils/constants";
import { useRouter } from "next/router";
const { ROOT } = PathNames;
const CheckAuthAndUpdateUser = () => {
	/**
	 * once the application is loaded, update user data and make sure token and password are still valid
	 * else, perform log out
	 */
	const dispatch = useDispatch();
	const { token, user } = useAuth();
	const router = useRouter();
	useEffect(() => {
		const checkAuthAndUpdateUser = async () => {
			try {
				/**
				 * check for token and password validity
				 */
				// TODO: check if password is valid
				const userFromDb = await getUser(user._id, token);
				dispatch(updateUser(userFromDb));
			} catch (error) {
				await dispatch(logOut());
				await router.push(ROOT);
			}
		};
		checkAuthAndUpdateUser();
	}, []);

	return <></>;
};

export default CheckAuthAndUpdateUser;
