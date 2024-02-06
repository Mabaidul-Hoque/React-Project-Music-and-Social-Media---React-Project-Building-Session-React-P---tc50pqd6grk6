export function Comment({ comment }) {
  return (
    <div
      style={{
        marginTop: 20,
        border: "1px solid black",
        padding: 20,
      }}
    >
      <h4>{comment.content}</h4>
    </div>
  );
}
