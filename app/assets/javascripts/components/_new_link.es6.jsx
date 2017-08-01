class NewLink extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      url: '',
      title: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log(this);
    let url = this.refs.url.value
    let title = this.refs.title.value
    $.ajax({
      url: '/api/v1/links',
      type: 'POST',
      data: { link: { url: url, title, title} },
      success: (link => this.props.handleSubmit(link))
    }).fail(function() {
	    alert("URL not valid without http:// or https://")
    })
    this.setState({ url: '', title: ''})
  }

  render() {
    return (
      <div>
        <input id='my-url' className='link-url-field' ref='url' placeholder='Enter the url of the link' defaultValue="http://" />
        <input className='link-title-field' ref='title' placeholder='Enter a title' required />
        <button onClick={this.handleClick}>Add Link</button>
      </div>
    )
  }
}
