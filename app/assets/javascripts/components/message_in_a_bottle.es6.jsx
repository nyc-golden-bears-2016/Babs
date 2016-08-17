class MessageInABottle extends React.Component{

  constructor() {
    super();
  }

  render() {
    return (
      <p>
        <a href="/mib" onClick={this.props.onHandleClick}>{this.props.data}!</a>
      </p>
    );
  }

}
