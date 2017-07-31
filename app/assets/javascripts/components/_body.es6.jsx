class Body extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      links: []
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.updateLinks = this.updateLinks.bind(this)
    this.handleMarkRead = this.handleMarkRead.bind(this)
    this.sendToHotReads = this.sendToHotReads.bind(this)
    this.searchLinks = this.searchLinks.bind(this)
  }

  componentDidMount() {
    const links = JSON.parse(localStorage.getItem('links')) || []
    $.getJSON('/api/v1/links', links => this.setState({ links }))
  }

  handleSubmit(link) {
    let newState = this.state.links.concat(link)
    this.setState({ links: newState })
  }

  handleDelete(id) {
    $.ajax({
      url: `/api/v1/links/${id}`,
      type: 'DELETE',
      success: (() => this.removeLink(id)),
    })
  }

  removeLink(id) {
    let newLinks = this.state.links.filter(link => link.id != id)
    this.setState({ links: newLinks})
  }

  handleMarkRead(link) {
    $.ajax({
      url: `/api/v1/links/${link.id}`,
      type: 'PATCH',
      data: { link },
      success: (() => this.sendToHotReads(link)),
    })
  }

  sendToHotReads(link) {
    if(link.read === true) {
      $.ajax({
        url: `https://guarded-reef-14770.herokuapp.com/api/v1/links`,
        type: 'POST',
        data: { url: link.url },
        success: (console.log("success!")),
      })
    }
  }

  handleUpdate(link) {
    $.ajax({
      url: `/api/v1/links/${link.id}`,
      type: 'PUT',
      data: { link },
      success: (() => this.updateLinks(link)),
    })
  }

  updateLinks(link) {
    let links = this.state.links.filter(i => i.id != link.id )
    links.push(link)
    this.setState({links: links})
  }

  searchLinks(query) {
    let links = this.state.links.filter((link) => {
      return link.title.includes(query) || link.url.includes(query)
    })
    this.setState({links: links})
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <NewLink handleSubmit={this.handleSubmit} />
          <br />
          <Search searchLinks={this.searchLinks.bind(this)}/>
          <br />
          <div className="row">
            <div className="col-md-4">
              <AllLinks
                links={this.state.links}
                handleDelete={this.handleDelete} handleMarkRead={this.handleMarkRead} handleUpdate={this.handleUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
