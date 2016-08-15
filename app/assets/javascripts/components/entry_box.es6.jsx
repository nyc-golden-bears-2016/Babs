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
        inspo = this.props.inspo,
        is_private = this.state.bottle;
    $.ajax({
      url: '/entries',
      method: 'POST',
      data: { entry: { body: body, is_private: is_private, can_respond: can_respond, prompt_id:inspo.id} }
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
          <textarea ref="entryTextarea" name="body"/>
          <input type='submit' value='Post'/>
        </form>
      </section>
      <section id="bottle-button">
      <form id="bottle-form" onClick={this.onPrivate}>
          Message In A Bottle:
          <input type='checkbox'  value='Message In A Bottle'/>
        </form>
      </section>
      <section id="respond-button">
      <form id="can-respond-form" onClick={this.onRespond}>
          Can Be Responded To:
          <input type='checkbox'  value='Can Respond'/>
      </form>
      </section>
      </div>

    );
  }
}
