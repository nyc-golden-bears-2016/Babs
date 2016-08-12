class Entry extends React.Component {
  render() {
    return (
      <li className="entry">
            <span className="full-name">{this.props.data.body}</span>
      </li>
    )
  }
}
