import { Component } from "react";

class MovieForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      poster: "",
      comment: "",
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = (e) => {
    e.preventDefault();

    const url = "https://post-a-form.herokuapp.com/api/movies/";

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    };

    fetch(url, config)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          alert(`Your movie ${res.title} has been successfully added!`);
        }
      })
      .catch((e) => {
        console.error(e);
        alert("There was an error when adding the movie to the list.");
      });
  };

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <fieldset>
          <legend>Movie Information</legend>
          <div className="form-data">
            <label htmlFor="title">Movie Name</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={this.onChange}
              value={this.state.title}
            />
          </div>

          <div className="form-data">
            <label htmlFor="posterurl">Poster URL</label>
            <input
              type="url"
              id="posterurl"
              name="poster"
              onChange={this.onChange}
              value={this.state.poster}
            />
          </div>

          <div className="form-data">
            <label htmlFor="comment">Comment</label>
            <input
              type="text"
              id="comment"
              name="comment"
              onChange={this.onChange}
              value={this.state.comment}
            />
          </div>
          <hr />
          <div className="form-data">
            <input type="submit" value="Send" />
          </div>
        </fieldset>
      </form>
    );
  }
}

export default MovieForm;
