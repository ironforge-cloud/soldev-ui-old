import PropTypes from "prop-types";
import Promoted from "./promoted";
import Playlists from "./playlists";

export default function Videos({ playlists }) {
  return (
    <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
      {/* Promoted videos */}
      <Promoted />

      {/* Playlists */}
      <Playlists playlists={playlists} />
    </main>
  );
}

Videos.propTypes = {
  playlists: PropTypes.array.isRequired,
};
