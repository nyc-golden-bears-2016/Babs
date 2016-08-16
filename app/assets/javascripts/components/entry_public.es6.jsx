class EntryPublic extends React.Component {

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
      {this.props.all_prompts.map((prompt, i) => {
        if(prompt.id === this.props.data.prompt_id){
              return <span key={i}>{prompt.question}</span>
            }
        })}
        <br/>
        <span className="entry-bottle-span">{this.props.data.body}</span>
        <br/>
        <span className="delete-button"><DeleteButton id={this.props.data.id} onRemoveEntry={this.props.onRemoveEntry}/></span>
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
