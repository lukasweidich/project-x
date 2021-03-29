const useIsClientSide = (): boolean => {
	return typeof document !== "undefined";
};

export default useIsClientSide;
