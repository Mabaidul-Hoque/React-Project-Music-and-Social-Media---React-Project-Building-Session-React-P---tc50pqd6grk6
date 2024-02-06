import Image from "next/image";

export function MusicCard({ music, onClick }) {
  return (
    <div onClick={onClick} id="music-card" style={styles.container}>
      <img id="music-thumbnail" style={styles.image} src={music.thumbnail} />
      <div id="play-icon-container" style={styles.play_container}>
        <Image
          src={"https://www.svgrepo.com/show/111229/play-button.svg"}
          alt="play"
          height={50}
          width={50}
        />
      </div>
      <h3>{music.title}</h3>
      <h5>{music.artist.map((artist) => artist.name).join(" & ")}</h5>
    </div>
  );
}

const styles = {
  container: {
    width: 200,
    height: 300,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    cursor: "pointer",
    position: "relative",
  },
  image: {
    width: 180,
    height: 200,
  },
  play_container: {
    position: "absolute",
    width: 180,
    height: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 10,
    left: 10,
  },
};
