import Image from "next/image";
import styles from "./page.module.css";
import MusicCardsList from "../components/music-cards-list";

export default function Home() {
  return (
    <>
      <MusicCardsList />
      {/* <MusicPlayer /> */}
    </>
  );
}
