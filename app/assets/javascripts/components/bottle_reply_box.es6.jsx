class BottleReplyBox extends React.Component{

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
      textArea.value = '';
      this.props.onAddReply(response);
    })
  }

  render() {
    return (
      <section id="respond-box">
        <form  onSubmit={this.handleSubmit}>
          <textarea id="bottle-respond-box" ref="responseTextarea" name="body"/>
          <input ref="entryId" type="hidden" value={this.props.data.id}/>
          <input className="entry-post-button" type='submit' value='Respond'/>
        </form>
      </section>
    );
  }
}
