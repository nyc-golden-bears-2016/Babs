class EntryBox extends React.Component{

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state ={
      bottle: false,
      respond: false
    }

    this.onPrivate = this.onPrivate.bind(this);
    this.onRespond = this.onRespond.bind(this);
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


  handleSubmit(event) {
    event.preventDefault();
    let textArea = this.refs.entryTextarea,
        body = textArea.value,
        can_respond = this.state.respond,
        inspo = this.props.inspo.id,
        is_private = this.state.bottle;
    $.ajax({
      url: '/entries',
      method: 'POST',
      data: { entry: { body: body, is_private: is_private, can_respond: can_respond, prompt_id: inspo} }
    })
    .done((response) => {
      this.props.onAddEntry(response);
      textArea.value = '';
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
          Message in a Bottle:
          <input type='checkbox' value='Message In A Bottle'/>
      </section>
      <section id="respond-button" onClick={this.onRespond}>Respondable:
          <input type='checkbox'  value='Can Respond'/>
      </section><br/>
          <input type='submit' value='Post'/>
        </form>
      </section>
      </div>

    );
  }
}
