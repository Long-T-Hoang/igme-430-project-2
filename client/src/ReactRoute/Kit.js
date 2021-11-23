import NavBar from "./NavBar";

function Kit (props) {
    return (
        <div className="kit" kitId={props.kitId}>
            <NavBar />

            <main>
                <div id="kits"></div>
            </main>
        </div>
    );
};

export default Kit;