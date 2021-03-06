import styled from 'styled-components'
import { useState, useEffect } from 'react'
import Theme from './styles/theme'
import Header from './components/Header'
import Container from './components/Container'
import Btn from './components/Button'
import BooksRow from './components/BooksRow'
import CreateModal from './components/CreateModal'
import EditModal from './components/EditModal'

const StyledBtn = styled(Btn)`
  margin: 30px 30px 0px auto;
  `

const App = () => {
  const [isShowCreateModal, setShowCreateModal] = useState(false)
  const [isShowEditModal, setShowEditModal] = useState(false)
  const [books, setBooks] = useState([])
  const [editState, setEditState] = useState(null)

  // Функция для других компонентов, для отображения состояния на сервере
  const getBooks = () => {
    fetch('http://localhost:1717/books')
      .then((res) => res.json())
      .then((data) => setBooks(data))
  }

  useEffect(() => {
    getBooks()
  }, [])

  const handledit = (book) => {
    setShowEditModal(true)
    setEditState(book)
  }

  return (
    <Theme>
      <Header logo="BookList" title="Books" />
      <StyledBtn
        onClick={() => setShowCreateModal(true)}
      >Add Book
      </StyledBtn>
      <Container>
        <BooksRow
          books={books}
          onEdit={handledit}
          getBooks={getBooks}
        />
        <CreateModal
          getBooks={getBooks}
          books={books}
          isShow={isShowCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
        <EditModal
          getBooks={getBooks}
          isShow={isShowEditModal}
          editState={editState}
          setEditState={setEditState}
          onClose={() => setShowEditModal(false)}
        />
      </Container>
    </Theme>
  )
}

export default App
