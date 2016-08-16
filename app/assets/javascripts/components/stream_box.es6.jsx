class StreamBox extends React.Component{

  constructor() {
    super();
    this.state ={
      streams: [],
    };

  }


  // add input for user id.

  render() {
    return (
      <ul>
        {this.props.data.map((stream) => {
          return <Stream key= {this.props.data.indexOf(stream)} data={stream}/>
        })}
     </ul>
    );
  }
}
