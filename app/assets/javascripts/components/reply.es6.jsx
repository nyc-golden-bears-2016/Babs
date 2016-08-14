class Reply extends React.Component{

  constructor() {
    super();
  }


  // add input for user id.

  render() {
    return (
     <li>
        <span>{this.props.data.body}</span>
     </li>
    );
  }
}
