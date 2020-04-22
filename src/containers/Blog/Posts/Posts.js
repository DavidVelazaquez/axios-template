import React, { Component } from "react";
import axios from "../../../axios";
import { Link } from "react-router-dom";

import "./Posts.css";
import Post from "../../../components/Post/Post";

class Posts extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    console.log(this.props);
    try {
      const posts = await axios.get("/posts");
      const slicedPosts = posts.data.slice(0, 4);
      const updatedPosts = slicedPosts.map((post) => {
        return {
          ...post,
          author: "Dave",
        };
      });
      this.setState({
        posts: updatedPosts,
      });
    } catch (error) {
      console.log(error);
      // this.setState({ error: true });
    }
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          <Link to={"/" + post.id} key={post.id}>
            <Post
              clicked={() => this.postSelectedHandler(post.id)}
              title={post.title}
              author={post.author}
            />
          </Link>
        );
      });
    }

    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;
