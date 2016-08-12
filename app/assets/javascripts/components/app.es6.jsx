class App extends React.Component {

    constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      user: "",
      entries: []
    };

  }

  componentDidMount() {

    $.ajax({
      url: 'http://localhost:3000/users/show',
    })
    .done((response) => {
      this.setState({
        user: response
      });
    });

    $.ajax({
      url: 'http://localhost:3000/entries/show',
    })
    .done((response) => {
      debugger;
      this.setState({
        entries: response
      });
    });
  }

  addEntry(entry) {
    this.setState((prevState) => {
      return {
        entries: [entry, ...prevState.entries]
      };
    });
  }

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
          debugger;
      this.props.onAddEntry(response);
      textArea.value = '';
    })
  }

  render () {
    return (
      <div>

        <h1>Welcome, {this.state.user.username}!</h1>
        <form onSubmit={this.handleSubmit}>
          Write something:<br/>
          <textarea ref="entryTextarea" name="body"/>
          <input type='submit' value='Post'/>
        </form>
        <ul>
          {this.props.entries.map((entry) => {
            return <Entry key={entry.id} data={entry}/>
          })}
        </ul>
      </div>
      )
  }
}
