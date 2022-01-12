import {
  GET_BOOKS_SUCCESS,
  GET_BOOKS_LOADING,
  GET_BOOKS_FAILED,
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_LOADING,
  CREATE_BOOK_FAILED,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_LOADING,
  DELETE_BOOK_FAILED,
  EDIT_BOOK_SUCCESS,
  EDIT_BOOK_LOADING,
  EDIT_BOOK_FAILED }
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
        getBooks: {
          ...initalStatuses,
          loading: true,
        },
      }
    case GET_BOOKS_FAILED:
      return {
        ...state,
        getBooks: {
          ...initalStatuses,
          failed: true,
          error: action.error,
        },
      }

    case CREATE_BOOK_SUCCESS:
      return {
        ...state,
        createBook: {
          ...initalStatuses,
          success: true,
        },
      }
    case CREATE_BOOK_LOADING:
      return {
        ...state,
        createBook: {
          ...initalStatuses,
          loading: true,
        },
      }
    case CREATE_BOOK_FAILED:
      return {
        ...state,
        createBook: {
          ...initalStatuses,
          failed: true,
          error: action.error,
        },
      }

    case EDIT_BOOK_SUCCESS:
      return {
        ...state,
        editBook: {
          ...initalStatuses,
          success: true,
        },
      }
    case EDIT_BOOK_LOADING:
      return {
        ...state,
        editBook: {
          ...initalStatuses,
          loading: true,
        },
      }
    case EDIT_BOOK_FAILED:
      return {
        ...state,
        editBook: {
          ...initalStatuses,
          failed: true,
          error: action.error,
        },
      }

    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        deleteBook: {
          ...initalStatuses,
          success: true,
        },
      }
    case DELETE_BOOK_LOADING:
      return {
        ...state,
        deleteBook: {
          ...initalStatuses,
          loading: true,
        },
      }
    case DELETE_BOOK_FAILED:
      return {
        ...state,
        deleteBook: {
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
