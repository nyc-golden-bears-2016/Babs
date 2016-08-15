class EntryBox extends React.Component{

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  };



  handleSubmit(event) {
    event.preventDefault();
    let textArea = this.refs.entryTextarea,
        body = textArea.value;
    $.ajax({
      url: '/entries',
      method: 'POST',
      data: { entry: { body: body } }
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
      <form id="bottle-form" onChange={this.handleSubmit}>
          Message In A Bottle:
          <input type='checkbox' checked={d.selected}  value='Message In A Bottle'/>
        </form>
      </section>
      </div>

    );
  }
}
