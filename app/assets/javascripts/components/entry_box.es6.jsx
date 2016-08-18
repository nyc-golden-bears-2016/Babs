class EntryBox extends React.Component{

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state ={
      respond: false,
      stream: true,
      personal: false,
      postLongEnough: false,
      bottleButtonYes: "bottle-button-no",
      respondButtonYes: "respond-button-no",
      streamButtonYes: "stream-button-yes"
  }

    this.onPrivate = this.onPrivate.bind(this);
    this.onRespond = this.onRespond.bind(this);
    this.onStream = this.onStream.bind(this);
    this.longEnough = this.longEnough.bind(this);
  };


  onPrivate(event){
    event.preventDefault();
    this.setState({ personal: !this.state.personal})
    if(this.state.personal){
      this.setState({bottleButtonYes: "bottle-button-no"})
    } else {
      this.setState({bottleButtonYes: "bottle-button-yes"})
      this.setState({streamButtonYes: "stream-button-no"})
      this.setState({stream:false})
    }
  }

  onRespond(event){
    event.preventDefault();
    this.setState({ respond: !this.state.respond })
    if(this.state.respond){
      this.setState({respondButtonYes: "respond-button-yes"})
      this.setState({streamButtonYes: "stream-button-no"})
      this.setState({stream:false})
    } else{
      this.setState({respondButtonYes: "respond-button-no"})
    }
  }

  onStream(event){
    event.preventDefault();
    if(this.state.stream === false){
      this.setState({stream: true})
    } else{
      this.setState({stream:false})
    }
    if(this.state.stream){
      this.setState({streamButtonYes: "stream-button-yes"})
      this.setState({respondButtonYes: "respond-button-no"})
      this.setState({bottleButtonYes: "bottle-button-no"})
    } else{
      this.setState({streamButtonYes: "stream-button-no"})
    }
    this.setState({respond:false})
    this.setState({personal:false})
  }

  // if the character minimum has been met for creating a new entry
  longEnough() {
    charCount = this.refs.entryTextarea.value.length
    if(charCount > 80) {
      this.setState({postLongEnough: 'post-long-enough',
                    textAreaSize: 'post-textarea',
                    bottleButtonYes: "bottle-button-yes",
                    respondButtonYes: "respond-button-yes",
                    streamButtonYes: "stream-button-no",
                    personal:false,
                    respond:true,
                    stream: false
                    })
    } else {
      this.setState({postLongEnough: false,
                    textAreaSize: 'textarea',
                    bottleButtonYes: "bottle-button-no",
                    respondButtonYes: "respond-button-no",
                    streamButtonYes: "stream-button-yes",
                    personal: true,
                    respond:false,
                    stream: true
                    })
  }
}

  handleSubmit(event) {
    event.preventDefault();
    let textArea = this.refs.entryTextarea,
        body = textArea.value,
        can_respond = this.state.respond,
        inspo = this.props.inspo.id,
        stream = this.state.stream,
        is_private = this.state.personal;
    $.ajax({
      url: '/entries',
      method: 'POST',
      data: { entry: { body: body, is_private: is_private, can_respond: can_respond, prompt_id: inspo, stream: stream} }
    })
    .done((response) => {
      textArea.value = '';
      this.setState({postLongEnough: false,
                    textAreaSize: 'textarea'});
      this.props.onAddEntry(response);
    })
  }

  render() {

    return (
      <div>
        <section id="entry-box">
          <section id="prompt"><h4>{this.props.inspo.question}</h4></section>
          <form id="entry-form" onSubmit={this.handleSubmit}>
              <textarea className={ this.state.textAreaSize } ref="entryTextarea" onKeyUp={this.longEnough} name="body" placeholder="Write something..."/><br/>
              <div className="post-icons">
              <a className={this.state.bottleButtonYes} id="bottle-button" onClick={this.onPrivate} href=""></a>
              <a className={this.state.respondButtonYes} id="respond-button" onClick={this.onRespond}href=""></a>
              <a className={this.state.streamButtonYes} id="stream-checkbox" onClick={this.onStream} href=""></a>
              <input className="entry-post-button" type='submit' value='Post'/><br/>
               </div>

          </form>
        </section>
      </div>

    );
  }
}
