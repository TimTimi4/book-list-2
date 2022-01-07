export const ENDPOINT = 'http://localhost:1717'

const headers = {
  'Content-Type': 'application/json',
}

export const getBooks = () => fetch(`${ENDPOINT}/books`).then((res) => res.json())

export const createBook = (body) => fetch(`${ENDPOINT}/books/create`, {
  method: 'POST',
  body: JSON.stringify(body),
  headers,
})

export const editBook = (id, body) => fetch(`${ENDPOINT}/books/update/${id}`, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers,
})

export const deleteBook = (id) => fetch(`${ENDPOINT}/books/delete/${id}`, {
  method: 'DELETE',
})
