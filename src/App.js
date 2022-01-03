import styled from 'styled-components'
import { useState } from 'react'
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

  return (
    <Theme>
      <Header logo="BookList" title="Books" />
      <StyledBtn
        onClick={() => setShowCreateModal(true)}
      >Add Book
      </StyledBtn>
      <Container>
        <BooksRow
          onClick={() => setShowEditModal(true)}
        />
        <CreateModal
          isShow={isShowCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
        <EditModal
          isShow={isShowEditModal}
          onClose={() => setShowEditModal(false)}
        />
      </Container>
    </Theme>
  )
}

export default App
