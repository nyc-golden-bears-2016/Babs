class MessageInABottle extends React.Component{

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <a href="/mib" onClick={this.props.onHandleClick}>{this.props.data}!</a>
      </div>
    );
  }

}
