class AllLinks extends React.Component {
  constructor(props) {
    super(props)
  }

  handleDelete(id) {
    this.props.handleDelete(id)
  }

  render() {
    let links = this.props.links.map(link => (
      <div className="links" key = {link.id}>
        <Link
          link={link}
          handleDelete={this.handleDelete.bind(this, link.id)}
          handleMarkRead={this.props.handleMarkRead}
          handleUpdate={this.props.handleUpdate} />
        </div>
      ))
      console.log()
    return <div>{links}</div>
  }
}
