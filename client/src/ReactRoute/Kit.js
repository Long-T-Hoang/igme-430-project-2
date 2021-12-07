import NavBar from "./NavBar";
import ReactDOM from 'react-dom';
import { useParams} from 'react-router-dom';
import React from "react";
import helper from "../helper/helper.js";

const fetchContent = (csrf, id) => {
    fetchKit(csrf, id);
    fetchComments(id);
};

const addKitToAccount = (csrf, kitID) => {
    const url = `/addAccountKit?_csrf=${csrf}`;

    const kitToUpdate = {
        kitID: kitID,
        quantity: 1,
    };

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(kitToUpdate)
    })
    .then(response => {
        return response.json();
    })
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });
};

const fetchKit = (csrf, id) => {
    // fetch kit
    fetch(`/getKit?id=${id}`, {
        method: 'GET',
        mode: 'cors',
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        loadKit(data.kits);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    // load contents
    const loadKit = (kits) => {
        const Kit = kits.map((kit) => 
            <div className='kit' key={kit._id}>
                <img src={"http://localhost:3001/" + kit.image} alt={kit.name}></img>
                <p>Name: {kit.name}</p>
                <p>Release Year: {kit.releaseYear}</p>
                <p>MSRP: {kit.msrp}&#165;</p>
                <input type="button" value="Add to account" onClick={() => addKitToAccount(csrf, kit._id)}/>
                <hr />
            </div>
        );

        ReactDOM.render(<div>{Kit}</div>, document.getElementById('kit'));
    };

};

const fetchComments = (id) => {
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

    const loadComment = (comments) => {
        const Comments = comments.map((comment) => 
            <div className="comment" key={comment._id}>
                <p className="comment-date">{comment.postedTime}</p>
                <p className="comment-text">{comment.content}</p>
            </div>
            );
        
        ReactDOM.render(<div>{Comments}</div>, document.getElementById('comment-container'));
    };
};

function CommentUploadForm (props) {
    const [commentContent, setCommentContent] = React.useState("");

    // bind POST event
    const postComment = (event) => {
        const url = `/postComment?_csrf=${props.csrf}`;
        
        const commentData = {
            kitID: props.id,
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
        .then(() => {
            fetchComments(props.id);
        })  
        .catch((error) => {
            console.error('Error:', error);
        });

        event.preventDefault();
    };

    return (
        <form id="comment-form" onSubmit={postComment}>
            <textarea id="comment-field" placeholder="Add a comment..." value={commentContent} onChange={event =>setCommentContent( event.target.value )}></textarea>
            <input type="hidden" value={props.id}></input>
            <input type="submit"></input>
        </form>
    );
};

function Kit () {
    const { id } = useParams();

    helper.getToken((data) => {
        ReactDOM.render(<CommentUploadForm csrf={data.csrfToken} id={id} />, document.querySelector("#comment-upload"));
        fetchContent(data.csrfToken, id);    
    });

    return (
        <div className="kit">
            <NavBar />

            <main>
                <div id="kit"></div>

                <h2>Comments</h2>

                <div id="comment-upload"></div>

                <div id="comment-container"></div>
            </main>
        </div>
    );
};

export default Kit;