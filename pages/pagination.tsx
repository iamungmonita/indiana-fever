import { Pagination } from '@/core/components';
import React, { useState, useEffect } from 'react';

interface Message {
    _id: string; // Adjust according to your data structure
    message: string;
}

const MessagesComponent: React.FC = () => {
    const [posts, setPosts] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalMessages, setTotalMessages] = useState<number>(0);
    const pageSize = 5; // Number of messages per page

    const fetchMessages = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:4002/message/receive?page=${page}&limit=${pageSize}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong');
            }

            const data = await response.json();
            setPosts(data.messages);
            setTotalMessages(data.total); // Set total messages for pagination
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages(currentPage);
    }, [currentPage]);

    const totalPages = Math.ceil(totalMessages / pageSize); // Calculate total pages


    const handlePageClick = (page: number) => {
        setCurrentPage(page); // Set current page to the clicked page
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>{post.message}</li>
                ))}
            </ul>

            <div>
                <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>

                {/* Generate page number buttons */}
                {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                        <button
                            key={pageNum}
                            onClick={() => handlePageClick(pageNum)}
                            disabled={currentPage === pageNum} // Disable the current page button
                        >
                            {pageNum}
                        </button>
                    );
                })}

                <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>

            <p>
                Page {currentPage} of {totalPages}
            </p>
            <Pagination />
        </div>
    );
};

export default MessagesComponent;
