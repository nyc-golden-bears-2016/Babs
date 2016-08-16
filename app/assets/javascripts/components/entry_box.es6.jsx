class EntryBox extends React.Component{

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state ={
      bottle: false,
      respond: false,
      stream: false
    }

    this.onPrivate = this.onPrivate.bind(this);
    this.onRespond = this.onRespond.bind(this);
    this.onStream = this.onStream.bind(this);
  };


  onPrivate(){
    if(this.state.bottle === false){
      this.setState({bottle: true})
    } else{
      this.setState({bottle:false})
    }
  }

  onRespond(){
    if(this.state.respond === false){
      this.setState({respond: true})
    } else{
      this.setState({respond:false})
    }
  }

 onStream(){
    if(this.state.stream === false){
      this.setState({stream: true})
    } else{
      this.setState({stream:false})
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let textArea = this.refs.entryTextarea,
        body = textArea.value,
        can_respond = this.state.respond,
        inspo = this.props.inspo.id,
        is_private = this.state.bottle;
        stream = this.state.stream;
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
      <form id="entry-form" onSubmit={this.handleSubmit}>
          Write something:<br/>
          <textarea ref="entryTextarea" name="body"/><br/>
          <section id="bottle-button" onClick={this.onPrivate}>
            <p>private:</p>
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
