class Reply extends React.Component{

  constructor() {
    super();
  }

  render() {
    return (
     <li>
        <span>{this.props.data.body}</span>
     </li>
    );
  }
}
