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
      showStream: "stream-big",
      showEntryForm: true,
      showBottle: false,
      showBottleClass: "bottle-entries-big",
      bottleButton: '=>',
      streamOn: '⇩',
      showStreamId: "show-stream-on",
<<<<<<< a275652335b514ab7f194aa4f1db4100c3164a44
      unlockedBottle: []
=======
      teaserClass: "teaser"
>>>>>>> stashes changes
    };

    this.addEntry = this.addEntry.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeEntry = this.removeEntry.bind(this);
    this.addReply = this.addReply.bind(this);
    this.updateStreams = this.updateStreams.bind(this);
    this.showStream = this.showStream.bind(this);
    this.onShowBottleClass = this.onShowBottleClass.bind(this);

  }

  removeEntry(entry) {
    let newTree = this.state.entries.filter(function(e){return e.id!==entry.id});
    this.setState({entries: newTree});
  }


  showStream(){
    if(this.state.showStream === "stream-big"){
      this.setState({showStream: "stream-small",
                    showStreamId: 'show-stream-on'})
    } else{
      this.setState({showStream: "stream-big",
                    showStreamId: 'show-stream-off'})
    }
    if(this.state.streamOn === '⇩'){
      this.setState({streamOn: '⇧'})
    }else{
      this.setState({streamOn: '⇩'})
    }
  }

  onShowBottleClass(){
    if(this.state.showBottleClass === "bottle-entries-big"){
      this.setState({showBottleClass: "bottle-entries-small"})
    } else{
      this.setState({showBottleClass: "bottle-entries-big"})
    }
    if(this.state.bottleButton === '=>'){
      this.setState({bottleButton: '<='})
    }else{
      this.setState({bottleButton: '=>'})
    }
  }







  componentDidMount() {
    $.ajax({
      url: '/users/show',
    })
    .done((userResponse) => {

      $.ajax({
        url: '/entries/show',
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
      $.ajax({url: '/entries/stream', success: function(data){
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
    this.setState({unlockedBottle: response.bottle}),
    this.setState({showBottle: true});
   }

   addReply(reply){
    let replies = this.state.replies;
    this.setState({replies: replies.concat(reply)});
   }


  render () {
    return (
      <section>
        <section className="bottle-show" onClick={this.onShowBottleClass}>
          <button type="button">{this.state.bottleButton}</button>
         </section>
        <div className={this.state.showBottleClass}>
          <h2 id="new-bottles">new bottles</h2>
          {this.state.unlockedBottle.length == 0 ? <MessageInABottle data={this.state.teaser} onHandleClick={this.handleClick} /> : <p>waiting for new bottle...</p> }
          <h2 id="new-bottles">New Bottles</h2>
          <div className={this.state.teaserClass}>
            <MessageInABottle data={this.state.teaser} onHandleClick={this.handleClick}/> "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies leo sed sapien feugiat vulputate. Sed laoreet in nulla ac convallis. Nullam a lorem neque. Vestibulum finibus fermentum hendrerit. Integer massa erat, tristique ac tempus vel, fringilla vel elit. Curabitur nec rhoncus lectus, quis ultricies nulla. Nam vitae dapibus"
          </div>
          <h2 id="your-bottles">your bottles</h2>
          <div>
            {this.state.showBottle ? <FullMessageInABottle onAddEntry={this.addEntry} onAddReply={this.addReply} data={this.state.unlockedBottle}/> : null }
          </div>
          <ul>
            {this.state.bottles.map((bottle, i) => {
              return <Bottle onAddReply={this.addReply} key={i} data={bottle} replies={this.state.replies} onRemoveEntry={this.removeEntry} />
            })}
          </ul>
        </div>
        <div className="user-entries">
          <h2>your entries</h2>
          <div>
          <EntryBox onAddEntry={this.addEntry} inspo ={this.state.inspo}/>
          </div>
          <ul>
            {this.state.entries.map((entry) => {
              if(entry.is_private === true && entry.stream === false){
              return <EntryPrivate onAddReply={this.addReply} key={entry.id} data={entry} all_prompts={this.state.all_prompts} replies={this.state.replies} onRemoveEntry={this.removeEntry} onInspo={this.state.inspo.question} userId={this.state.user.id}/>
            } else if (entry.is_private === false && entry.stream === false){
              return <EntryPublic onAddReply={this.addReply} key={entry.id} data={entry} all_prompts={this.state.all_prompts} replies={this.state.replies} onRemoveEntry={this.removeEntry} onInspo={this.state.inspo.question} userId={this.state.user.id}/>
            } else if (entry.stream === true){
              return <EntryStream onAddReply={this.addReply} key={entry.id} data={entry} all_prompts={this.state.all_prompts} replies={this.state.replies} onRemoveEntry={this.removeEntry} onInspo={this.state.inspo.question} userId={this.state.user.id}/>
            }
            })}
          </ul>
        </div>
        <div className = "streams">
          <section id={this.state.showStreamId} onClick={this.showStream}>
            <button id="stream-button" type="button">{this.state.streamOn}</button>
          </section>
          <footer className={"marquee " + this.state.showStream} ><span>{this.state.streams.join('')}</span></footer>
        </div>
      </section>

      )
  }
}
