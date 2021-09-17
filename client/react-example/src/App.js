import { useState, useEffect } from "react";
import "./App.css";
import Post from "./components/Post";
import { Spinner, Row, Col, Container } from "react-bootstrap";
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
      if (posts.length === 0) {
        return <h4 className="mt-4">There is no posts</h4>;
      } else {
        return posts.map((post) => (
          <Col md={6} lg={4} key={post._id}>
            <Post post={post} />
          </Col>
        ));
      }
    } else {
      return (
        <Spinner
          className="mt-4 d-block mx-auto"
          animation="border"
          role="status"
        />
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
    <Container className="App mt-4">
      <button onClick={createPost} className="btn btn-secondary mx-2">
        Create post
      </button>
      <button onClick={RandomPosts} className="btn btn-secondary mx-2">
        Create random posts
      </button>
      <button onClick={deletePosts} className="btn btn-danger mx-2">
        Delete all posts
      </button>
      <Row className="justify-content-center g-4 mt-4">{renderPosts()}</Row>
    </Container>
  );
}

export default App;
