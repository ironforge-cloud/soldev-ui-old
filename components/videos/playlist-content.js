import PropTypes from "prop-types";
import MiniCard from "./mini-card";

// TODO: Playlist title
export default function PlaylistContent({playlistDetails, playlistContent}) {
    return (
        <div className="flex flex-wrap justify-around place-content-start sm:space-x-2 md:space-x-3 2xl:p-6">
            {playlistContent.map((content) => (
                <div
                    key={content.ID}
                    className="cursor-pointer flex flex-col my-5 lg:my-8"
                    style={{width: "320px"}}
                >
                    <MiniCard content={content}/>
                </div>
            ))}
        </div>
    );
}

PlaylistContent.propTypes = {
    playlistContent: PropTypes.array.isRequired,
    playlistDetails: PropTypes.object.isRequired,
};
