class ReplyButton extends React.Component{

  constructor() {
    super();
    this.handleReply = this.handleReply.bind(this);
  }

  handleReply(event) {
    event.preventDefault();
      this.props.onShowBox();
    }


  render() {
    return (
      <div>
        <form id="reply-desire" onClick={this.handleReply}>
          <input type = "submit" value="Respond"/>
        </form>
      </div>
    );
  }


}
