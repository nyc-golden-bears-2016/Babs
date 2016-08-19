class Reply extends React.Component{

  constructor() {
    super();
  this.displayUserAnon = this.displayUserAnon.bind(this)
  }

  displayUserAnon() {
    if(this.props.data.user_id == this.props.userId) {
      return 'user-response'
    } else {
      return 'anon-response'
    }
  }

  render() {

    return (
     <li className={this.displayUserAnon()} >
        <span>{this.props.data.body}</span>
     </li>
    );
  }
}
