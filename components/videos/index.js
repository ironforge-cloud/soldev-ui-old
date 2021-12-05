import Promoted from "./promoted";
import Playlists from "./playlists";

export default function Videos() {
  return (
    <main className="flex-1 relative z-0 overflow-hidden focus:outline-none">
      {/* Promoted videos */}
      <Promoted />

      {/* Playlists */}
      <Playlists />
    </main>
  );
}
