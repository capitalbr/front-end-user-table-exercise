import React from "react";
import "./PaginationControls.css";

class PaginationControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: ""
    };
  }

  renderMidPageButtons(){
    let pages = [];
    let {currentPage, totalPages } = this.props
    if (this.props.error) return pages;
    for (let i = 1; i <= totalPages; i++){
      if (i === currentPage){
        pages.push(
          <li 
            key={`pages-${i}`}
            className="selected"
            onClick={ !this.props.loading ? (
              e => this.props.handlePageChange(e, i)
              ) : (e) => e.preventDefault() }>
            {i}
          </li>
        )
      } else {
        pages.push(
          <li 
            key={`pages-${i}`}
            onClick={!this.props.loading ? (
              e => this.props.handlePageChange(e, i)
            ) : (e) => e.preventDefault()}>
            {i}
          </li>
        )
      }
    }
    pages.unshift(
      <li 
        id="prev-li"
        className={`${1 === currentPage ? "grayed-out" : ""}`}
        key="pages-prev"
        onClick={!this.props.loading ? (
          e => this.props.handlePageChange(e, "prev")
        ) : (e) => e.preventDefault()}>
        Prev
      </li>
    )
    pages.push(
      <li 
        id="next-li"
        className={`${totalPages === currentPage ? "grayed-out" : ""}`}
        key="pages-next"
        onClick={!this.props.loading ? (
          e => this.props.handlePageChange(e, "next")
        ) : (e) => e.preventDefault()}>
        Next
      </li>
    )
    return pages;
  }

  render() {
    return (
      <ul className="pagination-controls">
        {this.renderMidPageButtons().map(button => {
          return button
        })}
      </ul>
    );
  }
}

export default PaginationControls;
