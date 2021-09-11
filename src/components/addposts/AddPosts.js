import React, {useEffect, useState} from 'react';
import './style.css';
import { createPost } from "../../API/api";

const AddPosts = () => {
    const initialValues = {title: "", body: "", userId: 0} //initial values before typing into input field
    const [dataInput, setDataInput] = useState(initialValues); //updates states value
    // form input error message
    const [formErr, setFormErr] = useState(null);
    // server prefetch hooker
    const [creatingPost, setCreatingPost] = useState(false);
    // server error message
    const [serverErrMessage, setServerErrMessage] = useState(null);
    const [serverErrMessageTiming, setServerErrMessageTiming] = useState(false);
    // alert user of post creation
    const [postCreationSuccess, setPostCreationSuccess] = useState(null)

    // handle change
    const handleChange = e => {
        const target = e.target;
        const name = target.name;
        if (target.type === "number") {
            // check if the input value is not less than 0
            if (target.value < 0) {
                // reset the input field to 0
                setDataInput({ ...dataInput, [name]: 0});
            } else 
                setDataInput({...dataInput, [name]: target.value});
        }
        else {
            // otherwise accept inputs from other fields of different data type
            setDataInput({...dataInput, [name]: target.value});
        }
        // clear error message on form during input
        setFormErr("");
    }

    const submitPost = e => {
        e.preventDefault();
        setPostCreationSuccess(null);
        setServerErrMessage(null);  // disable server error message when post is submited
        // check if the form actually has any data in the input fields
        const dataInputLengthfProps = Object.keys(dataInput).length;
        let propCounter = 0;
        for (let prop in dataInput) {
            if (prop !== "userId" && dataInput[prop]) {
                propCounter++;
            }
        }
        // check if propCounter is one below dataInput to display error message
        if ((dataInputLengthfProps - propCounter) === 1) {
            // all fields were entered and data can be submitted
            setCreatingPost(true);
            createPost(dataInput)
                .then(response => {
                    setCreatingPost(false);
                    setDataInput(initialValues); //reset the input fields
                    setPostCreationSuccess("Post added successfully");
                })
                .catch(error => {
                    setCreatingPost(false);
                    setServerErrMessage(error.message + ", please try again!"); // set server error message
                });
        } else {
            // one or more fields needs to be completed
            setFormErr("Please complete all fileds")
        }
    }

    useEffect(() => {
        // set time out for the display
        if (serverErrMessage) {
            // display error message and close the display after 10 seconds
            setServerErrMessageTiming(true);
            setTimeout(()=> {
                setServerErrMessageTiming(false);
                setServerErrMessage(null)
            }, 10000)
        }
    }, [serverErrMessage])

    return (
        <div>
            {
                // display server error message in a flash
                serverErrMessageTiming && (<div className='server-error'>{serverErrMessage}</div>)
            }
            {
                // display successful post creation message
                postCreationSuccess && (<div className="post-success">{postCreationSuccess}</div>)
            }
            <form onSubmit={submitPost}>
                <div className='form-fields'>
                    <label htmlFor='Title'>Title</label>
                    <input type='text' name='title' value={dataInput.title} onChange={handleChange} />
                </div>

                <div className='form-fields'>
                    <label htmlFor='body'>Body</label>
                    <textarea type='text' name="body" value={dataInput.body} onChange={handleChange} />
                </div>

                <div className='form-fields'>
                    <label htmlFor='userid'>UserID</label>
                    <input type='number' name="userId" value={dataInput.userId} onChange={handleChange} />
                </div>
                <button type='submit'>Create Post</button>
                {
                    // display error message from input field
                    formErr && (<div className='form-input-error'>{formErr}</div>)
                }
            </form>
            {
                // fetching data hooker
                creatingPost && (<div>Loading....</div>)
            }
        </div>
    )
}

export default AddPosts;