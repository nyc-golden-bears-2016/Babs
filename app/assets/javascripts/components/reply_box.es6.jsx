class ReplyBox extends React.Component{

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {

    event.preventDefault();
    let textArea = this.refs.responseTextarea,
        entry_id = this.refs.entryId.value,
        body = textArea.value;
    $.ajax({
      url: '/responses',
      method: 'POST',
      data: { response: { body: body, entry_id: entry_id } }
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
          <textarea ref="responseTextarea" name="body"/>
          <input className="entry-post-button" type='submit' value='Post'/><br/>
          <input ref="entryId" type="hidden" value={this.props.data.id}/>
        </form>
      </section>
    );
  }
}
