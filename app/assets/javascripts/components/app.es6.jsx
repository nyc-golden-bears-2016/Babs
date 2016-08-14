class App extends React.Component {

 constructor(){
    super();
    this.state ={
      user: "",
      entries: [],
      replies: []
    };

    this.addEntry = this.addEntry.bind(this);
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
          replies: entryResponse.responses
        });
        console.log("AHHH")
      });

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
          <EntryBox onAddEntry={this.addEntry}/>
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
