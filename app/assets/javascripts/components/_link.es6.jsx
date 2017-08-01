class Link extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.link.id,
      editable: false,
      title: this.props.link.title,
      url: this.props.link.url,
      read: this.props.link.read
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleMarkRead = this.handleMarkRead.bind(this)
  }

    handleEdit() {
    if(this.state.editable) {
      let id    = this.state.id
      let title = this.state.title
      let url   = this.state.url
      let read  = Boolean(this.state.read).valueOf();
      let link  = {id, title, url, read}
      this.props.handleUpdate(link)
    }
    this.setState({ editable: !this.state.editable })
  }

    handleMarkRead() {
      let id  = this.state.id
      let url = this.state.url
      let read  = !this.state.read
      let link = {id, url, read}
      this.setState({
        read: read
      })
      console.log(link)
      this.props.handleMarkRead(link)
    }

  render() {
    let title =
      this.state.editable ?
      <input type='text' onChange={(e) => this.setState({ title: e.target.value })} value={this.state.title} /> :
      <h4>{this.state.title}</h4>;

    let url =
      this.state.editable ?
      <input type='text' onChange={(e) => this.setState({ url: e.target.value })} value={this.state.url} /> :
      <p>{this.state.url}</p>

    let read = <p>{this.state.read.toString()}</p>

    return (
      <div className="link-details">
        {title}
        {url}
        {read}
        <button className="read-button" onClick={this.handleMarkRead}>
          {this.state.read ? 'Mark as Unread' : 'Mark as Read' }
        </button>&nbsp;&nbsp;&nbsp;
        <button onClick={this.props.handleDelete}>
          Delete
        </button>&nbsp;&nbsp;&nbsp;
        <button onClick={this.handleEdit}>
          {this.state.editable ? 'Submit' : 'Edit' }
        </button>
      </div>
    )
  }
}
