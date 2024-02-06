import { useRouter } from "next/navigation";

export function AuthenticationModal({ setShowModal }) {
  const router = useRouter();
  return (
    <div
      style={{
        position: "fixed",
        width: 300,
        height: 200,
        border: "1px solid black",
        backgroundColor: "white",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        top: "calc(50vh - 100px)",
        left: "calc(50vw - 150px)",
      }}
    >
      <h3>You need to login to like or comment on this post</h3>
      <h4>
        If you don't have any account signup here{" "}
        <button
          onClick={() => {
            router.push("/signup");
          }}
        >
          Sign up
        </button>
      </h4>
      <button onClick={() => setShowModal(false)}>Close</button>
    </div>
  );
}
