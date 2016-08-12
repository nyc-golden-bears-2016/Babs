class Entry extends React.Component {

 constructor(){
    super();
    this.state ={
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
        <span className="entry-span">{this.props.data.body}{this.props.data.id}</span>
        <span className="delete-button"><DeleteButton id={this.props.data.id} onRemoveEntry={this.props.onRemoveEntry}/></span>
        <span className="respond-button"><ReplyButton id={this.props.data.id} onShowBox={this.showBox}/></span>
       <ul>
          {this.state.replies.map((response) => {
            return <Reply key={entry.id} data={entry}/>
          })}
        </ul>
        {this.state.box ? <ReplyBox/> : null}
      </li>
    )
  }
}
