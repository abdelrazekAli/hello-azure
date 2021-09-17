import { useState, useEffect } from "react";
import "./App.css";
import Post from "./components/Post";
import { Container, Spinner } from "react-bootstrap";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState("");

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  });

  const RandomPosts = () => {
    axios
      .post("/api/posts/random", {})
      .then(() => {
        axios
          .get("/api/posts")
          .then((res) => {
            setPosts(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const deletePosts = () => {
    axios
      .delete("/api/posts/delete", {})
      .then(() => {
        axios
          .get("/api/posts")
          .then((res) => {
            setPosts(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const renderPosts = () => {
    if (posts) {
      if (posts.length == 0) {
        return <h4 className="mt-4">There is no posts</h4>;
      } else {
        return posts.map((post) => <Post key={post._id} post={post} />);
      }
    } else {
      return (
        <Container>
          <Spinner
            className="mt-4 d-block mx-auto"
            animation="border"
            role="status"
          />
        </Container>
      );
    }
  };

  const createPost = () => {
    let name = prompt("Enter post name");
    let text = prompt("Enter post text");
    if (name && text) {
      axios
        .post("api/posts/create", { name, text })
        .then(() => {
          axios
            .get("/api/posts")
            .then((res) => {
              setPosts(res.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="App mt-4">
      <button onClick={createPost} className="btn btn-secondary mx-2">
        Create post
      </button>
      <button onClick={RandomPosts} className="btn btn-secondary mx-2">
        Create random posts
      </button>
      <button onClick={deletePosts} className="btn btn-danger mx-2">
        Delete all posts
      </button>
      {renderPosts()}
    </div>
  );
}

export default App;
