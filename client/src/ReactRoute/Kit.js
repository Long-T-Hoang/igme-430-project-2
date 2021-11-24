import NavBar from "./NavBar";
import ReactDOM from 'react-dom';
import { useParams} from 'react-router-dom';
import React from "react";

function Kit () {
    const { id } = useParams();
    const [commentContent, setCommentContent] = React.useState("");

    // fetch kit
    fetch(`/getKit?id=${id}`, {
        method: 'GET',
        mode: 'cors',
    })
    .then(response => {
        return response.json();
    })
    .then(data => loadKit(data.kits))
    .catch((error) => {
        console.error('Error:', error);
    });

    const fetchComments = () => {
        fetch(`/getComments?id=${id}`, {
            method: 'GET',
            mode: 'cors',
        })
        .then(response => {
            return response.json();
        })
        .then(data => loadComment(data.comments))
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    fetchComments();

    // load contents
    const loadKit = (kits) => {
        const Kit = kits.map((kit) => 
            <div className='kit' key={kit._id}>
                <img src={kit.imageURL} alt={kit.name}></img>
                <p>Name: {kit.name}</p>
                <p>Release Year: {kit.releaseYear}</p>
                <p>MSRP: {kit.msrp}&#165;</p>
                <hr />
            </div>
        );

        ReactDOM.render(<div>{Kit}</div>, document.getElementById('kit'));
    };

    const loadComment = (comments) => {
        const Comments = comments.map((comment) => 
            <div className="comment" key={comment._id}>
                <p className="comment-date">{comment.postedTime}</p>
                <p className="comment-text">{comment.content}</p>
            </div>
            );
        
        ReactDOM.render(<div>{Comments}</div>, document.getElementById('comment-container'));
    };

    // bind event
    const postComment = (event) => {
        const url = `/postComment`;
        const commentData = {
            kitID: id,
            content: commentContent,
            postedTime: Date.now(),
        };

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(commentData)
        })
        .then(response => {
            return response.json();
        })
        .then(fetchComments())
        .catch((error) => {
            console.error('Error:', error);
        });

        event.preventDefault();
    };

    return (
        <div className="kit">
            <NavBar />

            <main>
                <div id="kit"></div>

                <h2>Comments</h2>

                <div id="comment-upload">
                    <p></p>
                    <form id="comment-form" onSubmit={postComment}>
                        <textarea id="comment-field" placeholder="Add a comment..." value={commentContent} onChange={event =>setCommentContent( event.target.value )}></textarea>
                        <input type="submit"></input>
                    </form>
                </div>

                <div id="comment-container">
                </div>
            </main>
        </div>
    );
};

export default Kit;