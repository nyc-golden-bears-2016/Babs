class EntryStream extends React.Component {

 constructor(){
    super();
      this.state ={
      user: "",
      entries: [],
      replies: [],
      box: false,
      question: false,
      showReply: true,
      replyButton:"hide"
    };


    this.showBox = this.showBox.bind(this)
    this.showQuestion = this.showQuestion.bind(this);
    this.hideResponses = this.hideResponses.bind(this)

  }

  showBox(){
    this.setState({box: true})
   }

  showQuestion(){
    this.setState({question: !this.state.question})
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
      <li className="entry-stream">
      {this.props.all_prompts.map((prompt, i) => {
            if(prompt.id === this.props.data.prompt_id){
                  return  this.state.question ? <span className="question" key={i}>{prompt.question}</span> : null
                }
            })}
        <br/>
        <span className="entry-stream-span">{this.props.data.body}</span>
        <br/>
        {this.props.data.user_id != this.props.data.viewer_id ? this.props.data.is_read ? <span className="mail-read"> &#9993; </span> : <span className="mail-unread"> &#9993; </span>  : null}
        <span className="delete-button"><DeleteButton id={this.props.data.id} onRemoveEntry={this.props.onRemoveEntry}/></span>
        <span className="respond-button"><ReplyButton id={this.props.data.id} onShowBox={this.showBox}/></span>
        <span  className="question-button"><QuestionButton id={this.props.data.id} onShowQuestion={this.showQuestion} /></span>
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
