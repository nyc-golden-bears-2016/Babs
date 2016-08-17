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
      bottles:  [{
                  id: 1,
                  body: 'Write an entry to unlock your first bottle!'
                }],
      all_prompts: [],
      showStream: true,
      showEntryForm: false,
      showBottle: false,
      streamOn: '=>'
    };

    this.addEntry = this.addEntry.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeEntry = this.removeEntry.bind(this);
    this.addReply = this.addReply.bind(this);
    this.updateStreams = this.updateStreams.bind(this);
    this.showStream = this.showStream.bind(this);

  }

  removeEntry(entry) {
    let newTree = this.state.entries.filter(function(e){return e.id!==entry.id});
    this.setState({entries: newTree});
  }


  showStream(){
    if(this.state.showStream === false){
      this.setState({showStream: true})
    } else{
      this.setState({showStream:false})
    }
    if(this.state.streamOn === '=>'){
      this.setState({streamOn: '<='})
    }else{
      this.setState({streamOn: '=>'})
    }
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
        });
        entryResponse.bottles.length > 0 ? this.setState({bottles: entryResponse.bottles}) : null
      });

    });

    var self = this;
    setInterval(function(){
      $.ajax({url: 'http://localhost:3000/entries/stream', success: function(data){
      }, dataType: "json"}).done(function(response){
        self.updateStreams({streams: response.streams})
      })
    }, 8000);


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
    this.setState({replies: replies.concat(reply)});
   }

  render () {
    return (
      <section>
        <div className="bottle-entries">
          <h2>Your Bottles:</h2>
          <div>
            {this.state.showBottle ? <FullMessageInABottle onAddEntry={this.addEntry} onAddReply={this.addReply} data={this.state.teaser}/> : null }
          </div>
          <ul>
            {this.state.bottles.map((bottle, i) => {
              return <Bottle onAddReply={this.addReply} key={i} data={bottle} replies={this.state.replies} onRemoveEntry={this.removeEntry} />
            })}
          </ul>
        </div>
        <div className="user-entries">
          <h2>Your Entries:</h2>
          <div>
            {this.state.showEntryForm ? <EntryBox onAddEntry={this.addEntry} inspo ={this.state.inspo}/> : <MessageInABottle data={this.state.teaser} onHandleClick={this.handleClick} />}
          </div>
          <ul>
            {this.state.entries.map((entry) => {
              if(entry.is_private === true && entry.stream === false){
              return <EntryPrivate onAddReply={this.addReply} key={entry.id} data={entry} all_prompts={this.state.all_prompts} replies={this.state.replies} onRemoveEntry={this.removeEntry} onInspo={this.state.inspo.question} />
            } else if (entry.is_private === false && entry.stream === false){
              return <EntryPublic onAddReply={this.addReply} key={entry.id} data={entry} all_prompts={this.state.all_prompts} replies={this.state.replies} onRemoveEntry={this.removeEntry} onInspo={this.state.inspo.question} />
            } else if (entry.stream === true){
              return <EntryStream onAddReply={this.addReply} key={entry.id} data={entry} all_prompts={this.state.all_prompts} replies={this.state.replies} onRemoveEntry={this.removeEntry} onInspo={this.state.inspo.question} />
            }
            })}
          </ul>
        </div>
        <div className = "streams">
        <section id="stream-button" onClick={this.showStream}>
          <button type="button">{this.state.streamOn}</button>
         </section>
        {this.state.showStream ? <footer className="marquee"><span>{this.state.streams.join('')}</span></footer> : null }
        </div>
      </section>

      )
  }
}
