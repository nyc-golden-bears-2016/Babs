class App extends React.Component {

 constructor(){
    super();
    this.state ={
      user: "",
      entries: [],
      replies: [],
      streams: [],
      teaser: '',
      inspo: '',
      bottles: [],
      all_prompts: [],
      showEntryForm: false,
      showBottle: false
    };

    this.addEntry = this.addEntry.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeEntry = this.removeEntry.bind(this);
    this.addReply = this.addReply.bind(this);
    this.updateStreams = this.updateStreams.bind(this);
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
          inspo: entryResponse.inspo,
          all_prompts: entryResponse.all_prompts,
          bottles: entryResponse.bottles
        });
      });

    });

    var self = this;
    setInterval(function(){
      $.ajax({url: 'http://localhost:3000/entries/stream', success: function(data){
      }, dataType: "json"}).done(function(response){
        self.updateStreams({streams: response.streams})
      })
    }, 1000);




  }

  updateStreams(response) {
    this.setState(response);
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

   addReply(reply){
    let replies = this.state.replies;
    this.setState({replies: [reply, ...replies]});
   }

  render () {
    return (
      <section>
        <div className = "streams">
        <p className="marquee"><span>{this.state.streams.join(".......")}</span></p>
        </div>
        <div className="bottle-entries">
          <h1>Welcome, {this.state.user.username}!</h1>
          <p>{this.state.inspo.question}</p>
          <div>
            {this.state.showBottle ? <FullMessageInABottle onAddEntry={this.addEntry} onAddReply={this.addReply} data={this.state.teaser}/> : null }
          </div>
          <ul>
            {this.state.bottles.map((bottle) => {
              return <Bottle onAddReply={this.addReply} key={bottle.id} data={bottle} replies={this.state.replies} onRemoveEntry={this.removeEntry} />
            })}
          </ul>
        </div>
        <div className="user-entries">
          <div>

            {this.state.showEntryForm ? <EntryBox onAddEntry={this.addEntry} inspo ={this.state.inspo}/> : <MessageInABottle data={this.state.teaser} onHandleClick={this.handleClick} />}
          </div>
          <ul>
            {this.state.entries.map((entry) => {
              return <Entry onAddReply={this.addReply} key={entry.id} data={entry} all_prompts={this.state.all_prompts} replies={this.state.replies} onRemoveEntry={this.removeEntry} onInspo={this.state.inspo.question} />
            })}
          </ul>
        </div>
      </section>

      )
  }
}
