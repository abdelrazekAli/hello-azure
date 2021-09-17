const Post = ({ post }) => {
  const { name, text } = post;
  return (
    <>
      <h1>{name}</h1>
      <p>{text}</p>
    </>
  );
};

export default Post;
