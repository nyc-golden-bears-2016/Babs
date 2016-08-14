class Entry extends React.Component {

 constructor(){
    super();
      this.state ={
      user: "",
      entries: [],
      replies: [],
      box: false
    };

    this.addReply = this.addReply.bind(this);
    this.showBox = this.showBox.bind(this);

  }

  showBox(){
    this.setState({box: true})
   }

  addReply(reply){
    let replies = this.state.replies;
    this.setState({replies: [reply, ...replies]});
   }



  render() {
    return (
      <li className="entry">
        <span className="entry-span">{this.props.data.body}</span>
        <span className="delete-button"><DeleteButton id={this.props.data.id} onRemoveEntry={this.props.onRemoveEntry}/></span>
        <span className="respond-button"><ReplyButton id={this.props.data.id} onShowBox={this.showBox}/></span>
        <ul>
          {this.props.replies.map((response) => {
            return <Reply key={response.id} entryKey= {this.props.data.id} data={response} />
          })}
        </ul>
        <ul>
          {this.props.replies.map((reply)=>{
            if(reply.entry_id === this.props.data.id){
              return <Reply key={reply.id} data={reply}/>
            }
          })}
        </ul>
        {this.state.box ? <ReplyBox data={this.props.data} onAddReply={this.addReply} /> : null}
      </li>
    )
  }
}
