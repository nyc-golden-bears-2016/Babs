class Entry extends React.Component {

 // constructor(){
 //    super();
 //    this.state ={
 //      responses: []
 //    };

 //    this.addResponse = this.addResponse.bind(this);
 //  }



  render() {
    return (
      <li className="entry">
        <span className="entry-span">{this.props.data.body}{this.props.data.id}</span>
        <span className="delete-button"><DeleteButton id={this.props.data.id} onRemoveEntry={this.props.onRemoveEntry}/></span>
      </li>
    )
  }
}


       //  <span className="respond-button"><ResponseButton id={this.props.data.id} onAddResponse={this.props.onRemoveEntry}/></span>
       // <ul>
       //    {this.state.responses.map((response) => {
       //      return <Response key={entry.id} data={entry}/>
       //    })}
       //  </ul>
