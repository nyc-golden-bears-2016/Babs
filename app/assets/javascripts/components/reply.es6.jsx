class Reply extends React.Component{

  constructor() {
    super();
  }


  // add input for user id.

  render() {
    return (
     <li>
<span>{if(this.props.data.id === this.props.entryKey){
        return {this.props.data.body}}
      }</span>
     </li>
    );
  }
}
