class FullMessageInABottle extends React.Component{

  constructor() {
    super();
    this.state = {
      respondable: false
    }
  }

  componentDidMount() {
    $.ajax({
      url: 'http://localhost:3000/entries/viewed'
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
        <span href="/mib">{this.props.data.body}!</span>
        {this.state.respondable ? <BottleReplyBox onAddEntry={this.props.onAddEntry}/> : null }
      </div>
    );
  }

}
