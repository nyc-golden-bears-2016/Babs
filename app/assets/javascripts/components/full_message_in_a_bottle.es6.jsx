class FullMessageInABottle extends React.Component{

  constructor() {
    super();
    this.state = {
      respondable: false
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/entries/viewed'
    })
    .done((response) => {
        this.setState({
          respondable: response.respondable
        });
    });

  }

  render() {
    return (
      <div>
        <span href="/mib">{this.props.data.body}</span>
        {this.state.respondable ? <BottleReplyBox onAddReply={this.props.onAddReply} data={this.props.data} onAddEntry={this.props.onAddEntry}/> : null }
      </div>
    );
  }

}
