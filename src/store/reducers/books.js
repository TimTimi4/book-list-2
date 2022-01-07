import {
  GET_BOOKS_SUCCESS,
  GET_BOOKS_LOADING,
  GET_BOOKS_FAILED,
  CREATE_BOOKS_SUCCESS,
  CREATE_BOOKS_LOADING,
  CREATE_BOOKS_FAILED }
  from '../constants'

const initalStatuses = {
  success: false,
  loading: false,
  failed: false,
  error: '',
}

const initialState = {
  books: [],
  getBooks: initalStatuses,
  createBook: initalStatuses,
  editBook: initalStatuses,
  deleteBook: initalStatuses,
}

// eslint-disable-next-line
function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.data,
        getBooks: {
          ...initalStatuses,
          success: true,
        },
      }
    case GET_BOOKS_LOADING:
      return {
        ...state,
        books: action.data,
        getBooks: {
          ...initalStatuses,
          loading: true,
        },
      }
    case GET_BOOKS_FAILED:
      return {
        ...state,
        books: action.data,
        getBooks: {
          ...initalStatuses,
          failed: true,
          error: action.error,
        },
      }
    case CREATE_BOOKS_SUCCESS:
      return {
        ...state,
        createBook: {
          ...initalStatuses,
          success: true,
        },
      }
    case CREATE_BOOKS_LOADING:
      return {
        ...state,
        books: action.data,
        createBook: {
          ...initalStatuses,
          loading: true,
        },
      }
    case CREATE_BOOKS_FAILED:
      return {
        ...state,
        books: action.data,
        createBook: {
          ...initalStatuses,
          failed: true,
          error: action.error,
        },
      }
    default:
      return state
  }
}

export default reducer
