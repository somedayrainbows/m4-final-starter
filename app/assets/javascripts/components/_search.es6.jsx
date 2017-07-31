class Search extends React.Component {
  handleSearch(e) {
    this.props.searchLinks(e.target.value)
  }

  render() {
    return (
      <form>
          <label>Search</label><br />
          <input
            type='text'
            placeholder='Start typing to filter...'
            onKeyUp={this.handleSearch.bind(this)}
          />
      </form>
    )
  }
}
