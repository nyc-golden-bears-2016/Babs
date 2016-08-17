class Stream extends React.Component{

  constructor() {
    super();
  }

  render() {
    return (
      <li>
        <span>{this.props.data}</span>
      </li>
    );
  }
}
