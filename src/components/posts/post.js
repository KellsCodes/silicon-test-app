import React, { useEffect, useState } from 'react';
import { getSinglePost } from '../../API/api';

const SinglePost = (props) => {
    const [post, setPost] = useState(null);
    const [serverErrMessage, setServerErrMessage] = useState(null);
    const [errMessage, setErrMessage] = useState(null);
    const routeParameter = props.match.params.id;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        getSinglePost(routeParameter)
            .then(response => {
                setLoading(false);
                console.log(response.data)
                if (response.data) return setPost(response.data)
                return setErrMessage("No post found")
            })
            .catch(error => {
                setLoading(false);
                setServerErrMessage(error.message)
            })
    }, [routeParameter])
    return (
        <div>
            {loading && (<h4>Loading....</h4>)}
            {post && (
                <div>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>)
            }
            {serverErrMessage && (<h3>{serverErrMessage}</h3>)}
            {errMessage && (<h3>{errMessage}</h3>)}
        </div>
    )
}

export default SinglePost;