import { useRouter } from 'next/router';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ContactFormInterface } from '@/core/components/ContactForm';
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
    const [message, setMessage] = useState<ContactFormInterface[]>([])
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

    useEffect(() => {
        fetch('http://localhost:4002/message/receive', {
            method: 'GET',
            credentials: 'include',
        }).then((res) => res.json()).then((data) => {
            if (data.receiver) {
                setMessage(data.receiver)
            }
        }).catch((err) => console.log(err))
    }, [message])

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
            <div className='flex border w-screen flex-col flex-wrap'>
                {message.map((mess) => (
                    <p
                        className='w-[70%] p-3 border-b flex-grow rounded-md min-w-[100px] flex-shrink-0'
                        key={mess._id}
                    >
                        {mess.name}
                        <br />

                        <div>
                            <span>{mess.message}</span>
                            <button className='bg-slate-100 py-2 px-5 rounded-md'>
                                <a href={`mailto:${mess.email}?subject=Subject%20Here&body=Message%20Here`}>Reply</a>

                            </button>
                        </div>
                    </p>
                ))}
            </div>
            {children}
        </AuthContext.Provider>
    );
};

export default Dashboard