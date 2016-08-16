class EntryPrivate extends React.Component {

 constructor(){
    super();
      this.state ={
      user: "",
      entries: [],
      replies: [],
      box: false,
      showReply: true,
      replyButton:"hide"
    };


    this.showBox = this.showBox.bind(this);
    this.hideResponses = this.hideResponses.bind(this);

  }

  showBox(){
    this.setState({box: true})
   }

   hideResponses(){
    if(this.state.showReply === true){
      this.setState({showReply: false})
    } else{
      this.setState({showReply: true})
    }
     if(this.state.replyButton === "hide"){
      this.setState({replyButton: "show"})
    }else{
      this.setState({replyButton: "hide"})
    }
   }


  render() {
    return (
      <li className="entry">
      {this.props.all_prompts.map((prompt, i) => {
        if(prompt.id === this.props.data.prompt_id){
              return <span key={i}>{prompt.question}</span>
            }
        })}
        <br/>
        <span className="entry-private-span">{this.props.data.body}</span>
        <br/>
        <span className="delete-button"><DeleteButton id={this.props.data.id} onRemoveEntry={this.props.onRemoveEntry}/></span>
        <span className="respond-button"><ReplyButton id={this.props.data.id} onShowBox={this.showBox}/></span>
        {this.state.showReply ?
        <ul>
          {this.state.replies.map((reply)=>{
             <Reply key={reply.id} data={reply}/>
          })}
        </ul> : null}
         <span className="hide-respones" onClick={this.hideResponses}>
          <button type = "button">{this.state.replyButton}</button>
         </span>
         {this.state.showReply ?
            <ul>
              {this.props.replies.map((reply)=>{
                if(reply.entry_id === this.props.data.id){
                  return <Reply key={reply.id} data={reply}/>
                }
              })}
            </ul> : null}
        {this.state.box ? <ReplyBox data={this.props.data} onAddReply={this.props.onAddReply} /> : null}
      </li>
    )
  }
}
