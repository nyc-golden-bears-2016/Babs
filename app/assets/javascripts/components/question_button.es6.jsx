class QuestionButton extends React.Component{

  constructor() {
    super();
    this.handleQuestion = this.handleQuestion.bind(this);
  }

  handleQuestion(event) {
    event.preventDefault();
      this.props.onShowQuestion();
    }


  render() {
    return (
      <div>
        <form id="reply-desire" onClick={this.handleQuestion}>
          <input type = "submit" value="?"/>
        </form>
      </div>
    );
  }


}
