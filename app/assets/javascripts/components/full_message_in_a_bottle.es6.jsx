class FullMessageInABottle extends React.Component{

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <span href="/mib" onClick={this.props.onHandleClick}>{this.props.data}!</span>
      </div>
    );
  }

}
