class ReplyButton extends React.Component{

  constructor() {
    super();
    this.handleReply = this.handleReply.bind(this);
    this.state = {
      plusMinus: "+"
    }
  }

  handleReply(event) {
    event.preventDefault();
    if (this.state.plusMinus === "+"){
        this.setState({plusMinus: "−"})
      } else {
        this.setState({plusMinus: "+"})
      }
      this.props.onHide();
      this.props.onShowBox();

    }

  render() {
    return (
      <div>
        <form id="reply-desire" onClick={this.handleReply}>
          <input className="plus-minus-button" type="submit" value={this.state.plusMinus}/>
        </form>
      </div>
    );
  }


}
