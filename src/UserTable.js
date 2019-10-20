import React from "react";
import "./UserTable.css";
import API from "./utils/API";
import PaginationControls from "./PaginationControls"

class UserTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: { "1": [] },
      error: false,
      loading: false,
      currentPage: 1,
      search: "",
      resultAmount: 5
    };

    this.searchTimeout = undefined;
    this.apiReqDelay = 400;
  }

  async componentDidMount() {
    const usersData = await API.get("/users");
    this.paginateUsers(usersData)
  }

  handleSearch = async (ev) => {
    const value = ev;
    let searchData;
    await this.setState({ 
      loading: true,
      error: false,
      currentPage: 1 
    })
    try {
      searchData = await API.get(`/users?name_like=${value}`);
    } catch (err) {
      await this.setState({ 
        error: true,
        loading: false,
        users: { 1: [] } 
      })
      return
    }

    this.paginateUsers(searchData);
  }

  paginateUsers = async ({ data }) => {
    if (data.length === 0) {
      return await this.setState({
        users: { 1: [] },
        loading: false,
      })
    };
    let userObject = {}
    let page = 1;
    data.forEach((user, idx) => {
      if (idx !== 0 && idx % this.state.resultAmount === 0) page++;
      if (!userObject[page]) userObject[page] = [];
      userObject[page].push(user);
    })
    let { currentPage } = this.state;
    while (!userObject[currentPage]){
      currentPage--
    }
    await this.setState({
      users: userObject,
      error: false,
      loading: false,
      currentPage
    });
  }

  handlePaginate = async (e) => {
    e.preventDefault()
    await this.setState({ resultAmount: e.currentTarget.value })
    let allResults = [];
    Object.keys(this.state.users).forEach(key => {
      allResults = allResults.concat(this.state.users[key]);
    })
    let usersObject = {
      data: allResults
    }
    this.paginateUsers(usersObject);
  }

  handlePageChange(e, value){
    e.preventDefault();
    let nextCurrentPage;
    switch(value){
      case "prev":
        nextCurrentPage = this.state.currentPage - 1;
        if (nextCurrentPage < 1) break;
        this.setState({ currentPage: nextCurrentPage });
        break;
      case "next":
        nextCurrentPage = this.state.currentPage + 1;
        if (nextCurrentPage > Object.keys(this.state.users).length) break;
        this.setState({ currentPage: this.state.currentPage + 1 });
        break;
      default:
        this.setState( { currentPage: value } )
    }
  }

  handleKeyUp(e){
    e.preventDefault();
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(this.handleSearch.bind(this, this.state.search), this.apiReqDelay);
  }
  handleKeyDown(e){
    clearTimeout(this.searchTimeout);
  }

  handleChange(e){
    e.preventDefault();
    this.setState({
      search: e.target.value
    })
  }

  render() {
    const { error, loading, currentPage } = this.state
    return (
      <div className="UserTable">
          <div 
            id={`${loading ? "visible-loading" : ""}`}
            className="loading">
            <div></div><div></div><div></div>
          </div>
        <div className="flex-container between">
          <label>
            Show:
            <input
              onChange={this.handlePaginate.bind(this)}
              type="number"
              min="1"
              max="15"
              value={this.state.resultAmount}
            />
          </label>
          <label>
            Search:
            <input 
              className="search-input"
              onChange={this.handleChange.bind(this)}
              type="text" 
              onKeyUp={this.handleKeyUp.bind(this)}
              onKeyDown={this.handleKeyDown.bind(this)}
              value={this.state.search}
              />
            </label>
        </div>
        <table 
          border="1"
          className={`${loading ? "grayed-out" : ""}`}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users[currentPage].map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <PaginationControls
          totalPages={Object.values(this.state.users).length}
          handlePageChange={this.handlePageChange.bind(this)}
          currentPage={currentPage}
          loading={loading}
          error={error}
        />
        <div 
          id={`${error ? "visible-error" : ""}`}
          className="error-message">
          We are sorry but the information you've requested is temporarily
          unavailable.  We are actively working on a solution to this problem and
          will have it resolved soon.  Thank you for your understanding.
        </div>
      </div>
    );
  }
}

export default UserTable;
