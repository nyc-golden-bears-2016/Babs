class Entry extends React.Component {

 constructor(){
    super();
      this.state ={
      user: "",
      entries: [],
      replies: [],
      box: false,
      question: false,
      showReply: true,
      replyButton: "↟"
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.showBox = this.showBox.bind(this);
    this.showQuestion = this.showQuestion.bind(this);
    this.hideResponses = this.hideResponses.bind(this);
    this.hideBox = this.hideBox.bind(this);

  }

  handleDelete(event) {
    event.preventDefault();
    var id = this.props.data.id
    $.ajax({
      url: `/entries/${id}`,
      method: 'DELETE'
    })
    .done((response) => {
      this.props.onRemoveEntry(response);
    })
  }


  showBox(){
    this.setState({box: !this.state.box})
   }

  showQuestion(event){
    event.preventDefault();
    this.setState({question: !this.state.question})
  }

   hideResponses(){
    if(this.state.showReply === true){
      this.setState({showReply: false})
    } else{
      this.setState({showReply: true})
    }
     if(this.state.replyButton === "↟"){
      this.setState({replyButton: "↡"})
    }else{
      this.setState({replyButton: "↟"})
    }
   }

  hideBox(){
    if(this.state.showReply === false){
      this.setState({showReply: true})
    }
  } 




  render() {
    return (
      <li className={this.props.entryType}>
      {this.props.all_prompts.map((prompt, i) => {
            if(prompt.id === this.props.data.prompt_id){
                  return  this.state.question ? <span className="question" key={i}>{prompt.question}</span> : null
                }
            })}
        <br/>
        <span className="entry-bottle-span">{this.props.data.body}</span>
        <br/>
        {this.props.data.user_id != this.props.data.viewer_id ? this.props.data.is_read ? <span className="mail-read"> &#9993; </span> : <span className="mail-unread"> &#9993; </span>  : null}
        <span className="delete-button">
          <form id="delete-form" onSubmit={this.handleDelete}>
            <input type = "submit" value="⊗"/>
          </form>
        </span>
        <span className="respond-button"><ReplyButton id={this.props.data.id} onShowBox={this.showBox} onHide={this.hideBox}/></span>
        <span className="question-button">
        <form id="reply-desire" onClick={this.showQuestion}>
          <input id="reply-desire" type = "submit" value="?"/>
        </form>
        </span>
        <button onClick={this.hideResponses} className="hide-responses-button" type = "button">{this.state.replyButton}</button>
        {this.state.showReply ?
        <ul>
          {this.state.replies.map((reply)=>{
             <Reply key={reply.id} data={reply} userId={this.props.userId}/>
          })}
        </ul> : null}
         {this.state.showReply ?
            <ul  className={"entry-responses-"+this.state.showReply}>
              {this.props.replies.map((reply)=>{
                if(reply.entry_id === this.props.data.id){
                  return <Reply key={reply.id} data={reply} userId={this.props.userId}/>
                }
              })}
            </ul> : null}
        {this.state.box ? <ReplyBox data={this.props.data} onAddReply={this.props.onAddReply} /> : null}
      </li>
    )
  }
}
