class App extends React.Component {

 constructor(){
    super();
    this.state ={
      user: "",
      entries: [],
      replies: [],
      teaser: '',
      inspo: '',
      bottles: [],
      showEntryForm: false,
      showBottle: false
    };

    this.addEntry = this.addEntry.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeEntry = this.removeEntry.bind(this);
  }

  removeEntry(entry) {
    let newTree = this.state.entries.filter(function(e){return e.id!==entry.id});
    this.setState({entries: newTree});
  }

  componentDidMount() {
    $.ajax({
      url: 'http://localhost:3000/users/show',
    })
    .done((userResponse) => {

      $.ajax({
        url: 'http://localhost:3000/entries/show',
      })
      .done((entryResponse) => {
        this.setState({
          user: userResponse,
          entries: entryResponse.entries,
          replies: entryResponse.responses,
          teaser: entryResponse.teaser,
          inspo: entryResponse.inspo
          bottles: entryResponse.bottles
        });
      });

    });

  }

  handleClick(event) {
    event.preventDefault();
      this.setState({
          showEntryForm: true
        });
  }

  addEntry(response){
    let entries = this.state.entries;
    this.setState({entries: [response.entry, ...entries]}),
    this.setState({teaser: response.bottle}),
    this.setState({showBottle: true});
   }

  render () {
    debugger;
    return (
      <div className="user-entries">
        <h1>Welcome, {this.state.user.username}!</h1>
        <p>{this.state.inspo.question}</p>
        <div>
          {this.state.showBottle ? <FullMessageInABottle data={this.state.teaser}/> : null }
          {this.state.showEntryForm ? <EntryBox onAddEntry={this.addEntry} inspo ={this.state.inspo}/> : <MessageInABottle data={this.state.teaser} onHandleClick={this.handleClick} />}

        </div>
        <ul>
          {this.state.entries.map((entry) => {
            return <Entry key={entry.id} data={entry} replies={this.state.replies} onRemoveEntry={this.removeEntry} onInspo={this.state.inspo.question} />
          })}
        </ul>
      </div>
      )
  }
}
