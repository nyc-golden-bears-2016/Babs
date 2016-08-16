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

  onRespond(){
    this.setState({ respond: !this.state.respond })
  }

  onStream(){
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
    if(charCount > 10) {
      this.setState({postLongEnough: 'post-long-enough'})
    } else {
      this.setState({postLongEnough: false})
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
      this.props.onAddEntry(response);
    })
  }

  render() {
    return (
      <div>
      <section id="entry-box">
      <h2>{this.props.inspo.question}</h2>
      <form id="entry-form" onSubmit={this.handleSubmit}>
          Write something:<br/>
          <textarea className={this.state.postLongEnough} ref="entryTextarea" onKeyUp={this.longEnough} name="body"/><br/>
          <section id="bottle-button" onClick={this.onPrivate}>
            <p>personal</p>
            <input type='checkbox' value='Message In A Bottle'/>
          </section>
            <section id="respond-button" onClick={this.onRespond}>Respondable:
                <input type='checkbox'  value='Can Respond'/>
            </section><br/>
            <section id="stream-button" onClick={this.onStream}>Stream:
                <input type='checkbox'  value='Stream'/>
            </section><br/>
          <input type='submit' value='Post'/>
        </form>
      </section>
      </div>

    );
  }
}
