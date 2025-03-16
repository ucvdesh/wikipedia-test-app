import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	ReactNode,
} from 'react';

type AuthContextType = {
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			await new Promise(resolve => setTimeout(resolve, 1000));
			setIsAuthenticated(true);
			setIsLoading(false);
		};

		checkAuth();
	}, []);

	const login = async (username: string, password: string) => {
		setIsLoading(true);
		await new Promise(resolve => setTimeout(resolve, 1000));
		setIsAuthenticated(true);
		setIsLoading(false);
	};

	const logout = () => {
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
