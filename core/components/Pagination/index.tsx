import React, { useEffect, useState } from 'react'


export type Pagination = {
    id: number,
    userId: number,
    body: string,
    title: string
}

const Pagination = () => {
    const [post, setPost] = useState<Pagination[]>([])
    const [currentIndex, setCurrentIndex] = useState(1)
    const postPerPage = 10
    //////
    const [searchInput, setSearchInput] = useState('')
    useEffect(() => {
        const getPost = async () => {

            await fetch('https://jsonplaceholder.typicode.com/posts')
                .then((res) => res.json())
                .then((data) => {
                    if (data) {

                        setPost(data)
                    }
                })
        }
        getPost()
    }, [])
    const filterPosts = post.filter((item) => item.title.toLowerCase().replace(/\s/g, '').includes(searchInput.toLowerCase().replace(/\s/g, '')))
    const totalFilteredPosts = filterPosts.length
    const totalPages = Math.ceil(totalFilteredPosts / postPerPage)
    const lastPostIndex = currentIndex * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPost = filterPosts.slice(firstPostIndex, lastPostIndex)
    // console.log(post);

    return (
        <div>
            <input type="text" placeholder='search' className='p-2 bg-slate-100' onChange={(e) => setSearchInput(e.target.value)} />
            {currentPost.length > 0 ? currentPost.map((item, index) => <p key={index}>{item.title}</p>) : 'nothing'}
            {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1
                return (
                    <button
                        type='button'
                        disabled={pageNum === currentIndex}
                        className={`p-2 border shadow ${pageNum === currentIndex && 'shadow-inner bg-slate-100'}`}
                        onClick={() => setCurrentIndex(pageNum)}
                        key={index}>
                        {pageNum}
                    </button>
                )
            }
            )}

        </div >
    )
}

export default Pagination