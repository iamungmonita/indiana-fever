import { useRouter } from 'next/router';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    admin: string | null;
    loading: boolean;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const Dashboard: React.FC<AuthProviderProps> = ({ children }) => {
    const [admin, setAdmin] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter()

    useEffect(() => {
        const checkCookie = async () => {
            try {
                const response = await fetch('http://localhost:4002/auth/check_cookie', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();

                if (data.error || !data.decodedToken) {
                    window.location.reload(); // R
                    router.push('/auth/sign-in')
                } else {
                    setAdmin(data.decodedToken.username);
                }
            } catch (err) {
                console.log(err);

            } finally {
                setLoading(false);
            }
        };

        checkCookie();
    }, []);

    const logout = async () => {
        fetch('http://localhost:4002/auth/sign-out', {
            method: 'GET',
            credentials: 'include'
        }).then((res) => {
            if (res.ok) {
                router.push('/auth/sign-in')
            }
        }).catch((err) => console.log(err))

    };

    return (
        <AuthContext.Provider value={{ admin, loading, logout }}>
            {!loading && admin && ( // Only render if not loading and admin is set
                <>
                    <h2>admin: {admin}</h2>
                    <button onClick={logout}>LOG OUT</button>
                </>
            )}
            {children}
        </AuthContext.Provider>
    );
};

export default Dashboard