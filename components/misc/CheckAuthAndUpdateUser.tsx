import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../actions/authActions";
import { updateUser } from "../../actions/userActions";
import useAuth from "../../hooks/useAuth";
import { getUser } from "../../utils/api";

const CheckAuthAndUpdateUser = () => {
	/**
	 * once the application is loaded, update user data and make sure token is still valid
	 * else, perform log out
	 */
	const dispatch = useDispatch();
	const { token, user } = useAuth();
	useEffect(() => {
		const checkAuthAndUpdateUser = async () => {
			try {
				const userFromDb = await getUser(user._id, token);
				dispatch(updateUser(userFromDb));
			} catch (error) {
				dispatch(logOut());
			}
		};
		checkAuthAndUpdateUser();
	}, []);

	return <></>;
};

export default CheckAuthAndUpdateUser;
