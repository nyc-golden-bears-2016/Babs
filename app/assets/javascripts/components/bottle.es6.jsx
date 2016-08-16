class Bottle extends React.Component {

 constructor(){
    super();
      this.state ={
      user: "",
      entries: [],
      replies: [],
      box: false
    };
    this.showBox = this.showBox.bind(this);

  }

  showBox(){
    this.setState({box: true})
   }

  render() {
    return (
      <li className="entry">
        <span className="entry-span">{this.props.data.body}</span><br />
        <span className="respond-button"><ReplyButton id={this.props.data.id} onShowBox={this.showBox}/></span>
        <ul>
          {this.state.replies.map((reply)=>{
              return <Reply key={reply.id} data={reply}/>
          })}
        </ul>
        <ul>
          {this.props.replies.map((reply)=>{
            if(reply.entry_id === this.props.data.id){
              return <Reply key={reply.id} data={reply}/>
            }
          })}
        </ul>
        {this.state.box ? <ReplyBox data={this.props.data} onAddReply={this.props.onAddReply} /> : null}
      </li>
    )
  }
}
