class Bottle extends React.Component {

 constructor(){
    super();
      this.state ={
      user: "",
      box: false
    };
    this.showBox = this.showBox.bind(this);
    this.hideBox = this.hideBox.bind(this);

  }

  showBox(){
    this.setState({box: !this.state.box})
   }

  hideBox(){
    if(this.state.showReply === false){
      this.setState({showReply: true})
    }
  } 


  render() {
    return (
      <li className="bottle-entry">
        <span className="entry-span">{this.props.data.body}</span><br />
        {this.props.data.can_respond ? <span className="respond-button"><ReplyButton id={this.props.data.id} onShowBox={this.showBox} onHide={this.hideBox}/></span>: null }
        <ul>
          {this.props.replies.map((reply)=>{
            if(reply.entry_id == this.props.data.id){
              return <Reply key={reply.id} data={reply}/>
            }
          })}
        </ul>
        {this.state.box ? <BottleReplyBox data={this.props.data} onAddReply={this.props.onAddReply} onHide={this.hideBox} /> : null}
      </li>
    )
  }
}