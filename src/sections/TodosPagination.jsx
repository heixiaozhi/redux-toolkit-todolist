const TodosPagination = ({ currentPage, sumPage, onChangePage }) => {
  return (
    <div className='todos__pagination'>
      <button
        className={`todos__pagination-btn ${
          currentPage === 1 ? 'todos__pagination-btn--disable' : ''
        }`}
        onClick={() => onChangePage(-1)}
      >
        上一页
      </button>
      <div className='todos__pagination-number'>
        <span>{currentPage}</span>/<span>{sumPage}</span>
      </div>
      <button
        className={`todos__pagination-btn ${
          currentPage === sumPage ? 'todos__pagination-btn--disable' : ''
        }`}
        onClick={() => onChangePage(1)}
      >
        下一页
      </button>
    </div>
  )
}

export default TodosPagination
