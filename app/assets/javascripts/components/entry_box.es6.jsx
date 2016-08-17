class EntryBox extends React.Component{

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state ={
      respond: false,
      stream: false,
      personal: false,
      respond: false,
      postLongEnough: false
  }

    this.onPrivate = this.onPrivate.bind(this);
    this.onRespond = this.onRespond.bind(this);
    this.onStream = this.onStream.bind(this);
    this.longEnough = this.longEnough.bind(this);
  };


  onPrivate(){
    this.setState({ personal: !this.state.personal})
  }

  onRespond(event){
    event.preventDefault();
    this.setState({ respond: !this.state.respond })
  }

  onStream(event){
    event.preventDefault();
    if(this.state.stream === false){
      this.setState({stream: true})
    } else{
      this.setState({stream:false})
    }
    this.setState({respond:false})
    this.setState({personal:false})
  }

  // if the character minimum has been met for creating a new entry
  longEnough() {
    charCount = this.refs.entryTextarea.value.length
    if(charCount > 30) {
      this.setState({postLongEnough: 'post-long-enough',
                    textAreaSize: 'post-textarea'})
    } else {
      this.setState({postLongEnough: false,
                    textAreaSize: 'textarea'})
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let textArea = this.refs.entryTextarea,
        body = textArea.value,
        can_respond = this.state.respond,
        inspo = this.props.inspo.id,
        stream = this.state.stream;
        is_private = this.state.personal;
    $.ajax({
      url: '/entries',
      method: 'POST',
      data: { entry: { body: body, is_private: is_private, can_respond: can_respond, prompt_id: inspo, stream: stream} }
    })
    .done((response) => {
      textArea.value = '';
      this.setState({postLongEnough: false,
                    textAreaSize: 'textarea'})
      this.props.onAddEntry(response);
    })
  }

  render() {

    return (
      <div>
        <section id="entry-box">
          <h4>{this.props.inspo.question}</h4>
          <form id="entry-form" onSubmit={this.handleSubmit}>
              <textarea className={ this.state.postLongEnough + " " + this.state.textAreaSize } ref="entryTextarea" onKeyUp={this.longEnough} name="body" placeholder="Write something..."/><br/>
              <a id="bottle-button bot-but" onClick={this.onPrivate} href="">bottle</a>
              <a href="/nowhere" id="respond-button" onClick={this.onRespond}>respond</a>
              <a id="stream-checkbox" onClick={this.onStream} href="/nowhere">♨</a>
            <input className="stream-link" type='submit' value='Post'/>
          </form>
        </section>
      </div>

    );
  }
}
