import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPost } from '../../API/api';

const Posts = () => {
    // create an empty acontainer for storing posts from api
    const [posts, setPosts] = useState([]);
    const [errMessage, setErrMessage] = useState('');

    // const getId = () => { }

    // map over data to diplay to client
    const displayAllPosts = posts.length && posts.map(post => (
        <div key={post.id}>
            <Link to={"/posts/"+post.id}>{post.title}</Link>
            <p>{post.body}</p>
        </div>
    ))

    // make api call after component mounts
    useEffect(() => {
        // axios.get("https://jsonplacehollder.typicode.com/posts")
        //     .then(response => setPosts(response.data))
        //     .catch(error => setErrMessage(error.message))
        getAllPost()
            .then(response => setPosts(response.data))
            .catch(error => setErrMessage(error.message));
    }, []);

    return (
        <div>
            {
                /* if no post yet, display this */
                (!posts.length && !errMessage) ? (<h3>Loading....</h3>) : (
                    <div>
                        {/* display posts when posts has been fetched or display nothing when nothing is found or network is bad */}
                        {displayAllPosts ? displayAllPosts : null}
                    </div>)

            }
            {(errMessage) && (<div>{errMessage}</div>)}
        </div>
    )
}

export default Posts;