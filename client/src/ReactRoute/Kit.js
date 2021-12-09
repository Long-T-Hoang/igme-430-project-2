import NavBar from "./NavBar";
import ReactDOM from 'react-dom';
import { useParams} from 'react-router-dom';
import React from "react";
import helper from "../helper/helper.js";

const fetchContent = (csrf, id) => {
    fetchKit(csrf, id);
    fetchComments(id);
};

const addKitToAccount = (event, csrf, kitID) => {
    event.preventDefault();

    const url = `/addAccountKit?_csrf=${csrf}`;
    
    const kitToUpdate = {
        kitID: kitID,
        quantity: event.target.querySelector('input[type="number"').value,
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
            <div className='kit is-flex is-flex-direction-row is-justify-content-space-evenly' key={kit._id}>
                <figure className="field image-field image is-3by2">
                    <img src={"http://localhost:3001/" + kit.image} alt={kit.name} />
                </figure>

                <div className="data-field field is-flex is-flex-direction-column is-justify-content-space-evenly">
                    <div>
                        <p>Name: <strong>{kit.name}</strong></p>
                        <p>Release Year: <strong>{kit.releaseYear}</strong></p>
                        <p>MSRP: <strong>{kit.msrp}&#165;</strong></p>
                        <p>Grade: <strong>{kit.grade}</strong></p>
                    </div>

                    <form className="is-flex is-align-content-stretch is-flex-direction-column" onSubmit={(event) => addKitToAccount(event, csrf, kit._id)}>
                        <div>
                            <label>Amount to add:</label>
                            <input className="input is-primary" type="number" min="1" placeholder="1"></input>
                        </div>
                        <input className="button is-primary" type="submit" value="Add to account" />
                    </form>
                </div>
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
            <div className="comment field box" key={comment._id}>
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
        <form id="comment-form" className="field" onSubmit={postComment}>
            <textarea className="textarea is-small" rows="4" id="comment-field" placeholder="Add a comment..." value={commentContent} onChange={event =>setCommentContent( event.target.value )}></textarea>
          
            <input type="hidden" value={props.id} />

            <input className="button is-primary" type="submit"></input>
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
        <div className="content is-flex is-justify-content-space-between is-flex-direction-column">
            <NavBar />

            <main className="background fill-page">
                <div id="kit"></div>

                <h2>Comments</h2>

                <div id="comment-upload"></div>

                <div id="comment-container"></div>
            </main>

            <footer className="footer has-background-primary is-size-7 pb-1 pt-1">Made By Tuan Long Hoang</footer>
        </div>
    );
};

export default Kit;