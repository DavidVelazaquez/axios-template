import React, { Component } from "react";
import axios from "../../../axios";
import { Route } from "react-router-dom";
// import { Link } from "react-router-dom";

import "./Posts.css";
import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";

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
    // this.setState({ selectedPostId: id });
    this.props.history.push({ pathname: "/posts/" + id });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          // <Link to={"/" + post.id} key={post.id}>
          <Post
            key={post.id}
            clicked={() => this.postSelectedHandler(post.id)}
            title={post.title}
            author={post.author}
          />
          // </Link>
        );
      });
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route
          path={this.props.match.url + "/:id"}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;
