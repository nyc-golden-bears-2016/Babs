class ReplyBox extends React.Component{

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let textArea = this.refs.entryTextarea,
        body = textArea.value;
    $.ajax({
      url: '/response',
      method: 'POST',
      data: { response: { body: body } }
    })
    .done((response) => {
      this.props.onAddReply(response);
      textArea.value = '';
    })
  }

  render() {
    return (
      <section id="respond-box">
      <form id="respond-box" onSubmit={this.handleSubmit}>
          Respond:<br/>
          <textarea ref="entryTextarea" name="body"/>
          <input type='submit' value='Respond'/>
        </form>
      </section>
    );
  }
}
