import React from 'react';
import _ from 'lodash'; // common convention is underscore for lodash
import PropTypes from 'prop-types';


const Pagination = (props) => {
  const { itemsCount, pageSize,currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  // we need to make an array of pages [1....pagesCount] so that we can use map function on it...
  // We will do this by using lodash...a popular JS library with a bunch of utility functions.
  // npm i lodash@4.17.10
  if(pagesCount===1) return null;
  const pages = _.range(1, pagesCount + 1);
    
  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li key={page} className={currentPage===page ? 'page-item active' : 'page-item'}>
            <a className="page-link" onClick={()=>onPageChange(page)}>{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
 
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange:PropTypes.func.isRequired,
};

export default Pagination;