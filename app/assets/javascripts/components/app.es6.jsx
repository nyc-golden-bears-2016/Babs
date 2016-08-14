class App extends React.Component {

 constructor(){
    super();
    this.state ={
      user: "",
      entries: [],
      replies: [],
      teaser: '',
      showEntryForm: false
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
          teaser: entryResponse.teaser
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




  addEntry(entry){
    let entries = this.state.entries;
    this.setState({entries: [entry, ...entries]});
   }



  render () {
    return (
      <div>
        <h1>Welcome, {this.state.user.username}!</h1>
        <div>
          {this.state.showEntryForm ? <EntryBox onAddEntry={this.addEntry}/> : <MessageInABottle data={this.state.teaser} onHandleClick={this.handleClick} />}
        </div>
        <ul>
          {this.state.entries.map((entry) => {
            return <Entry key={entry.id} data={entry} onRemoveEntry={this.removeEntry}/>
          })}
        </ul>
      </div>
      )
  }
}
