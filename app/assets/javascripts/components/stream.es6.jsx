class Stream extends React.Component{

  constructor() {
    super();
  }


  // add input for user id.

  render() {
    return (
     <li className="stream-bullet">
        <p className="marquee"><span>{this.props.data}</span></p>
     </li>
    );
  }
}
