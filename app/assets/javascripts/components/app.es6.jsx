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
      showStreamId: "show-stream-on",
      entryPrivate: "private",
      entryPublic: "public",
      entryStream: "stream",
      space: " ",
      faker: "",
      bottleButton: '⇆',
      streamOn: '⇅',
      showStreamId: "show-stream-off",
      unlockedBottle: {body: ""}
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
  }

  onShowBottleClass(){
    if(this.state.showBottleClass === "bottle-entries-big"){
      this.setState({showBottleClass: "bottle-entries-small"})
    } else{
      this.setState({showBottleClass: "bottle-entries-big"})
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
          faker: entryResponse.faker
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
    }, 1000, true);
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
    this.setState({entries: [response.entry, ...entries],
    unlockedBottle: response.bottle,
    showBottle: true});
   }

   addReply(reply){
    let replies = this.state.replies;
    this.setState({replies: replies.concat(reply)});
   }



  render () {
    return (
      <section>
        <section className="bottle-show" onClick={this.onShowBottleClass}>
          <button className={this.state.showBottleClass +"-button"} type="button">{this.state.bottleButton}</button>
         </section>
        <div className={this.state.showBottleClass}>
          <h2 id="new-bottles">new bottle</h2>
          {this.state.unlockedBottle.body.length == 0 ? <div className="teaser-font"><span>{this.state.teaser} </span><span className="teaser">{this.state.faker}</span></div> : <p>"waiting for new bottle"</p> }
          <h2 id="your-bottles">unlocked bottles</h2>
          <ul>
          {this.state.unlockedBottle.body.length > 0 ? <li><Bottle onAddReply={this.addReply} key={this.state.unlockedBottle.id} data={this.state.unlockedBottle} replies={this.state.replies} onRemoveEntry={this.removeEntry} /></li> : null}
            {this.state.bottles.map((bottle, i) => {
              return <Bottle onAddReply={this.addReply} key={i} data={bottle} replies={this.state.replies} onRemoveEntry={this.removeEntry} />
            })}
          </ul>
        </div>
        <div className="user-entries">
          <div>
            <EntryBox onAddEntry={this.addEntry} inspo ={this.state.inspo}/>
          </div>
          <h2 className="user-header" >entries</h2>
          <ul class="user-ul">
            {this.state.entries.map((entry) => {
              if(entry.is_private === true && entry.stream === false){
                entryType = this.state.entryPrivate
              } else if (entry.is_private === false && entry.stream === false) {
                entryType = this.state.entryPublic
              } else if (entry.stream === true){
                  entryType = this.state.entryStream
              }
              return <Entry entryType={entryType} onAddReply={this.addReply} key={entry.id} data={entry} all_prompts={this.state.all_prompts} replies={this.state.replies} onRemoveEntry={this.removeEntry} onInspo={this.state.inspo.question} userId={this.state.user.id}/>
              })}
          </ul>
        </div>
        <div className = "streams">
          <section id={this.state.showStreamId} onClick={this.showStream}>
            <button id={this.state.showStreamId+"-button"} type="button">{this.state.streamOn}</button>
          </section>
          <footer className={"marquee " + this.state.showStream} ><span>{this.state.streams.join('.....')}</span></footer>
        </div>
      </section>

      )
  }
}
