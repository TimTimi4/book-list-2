import styled from 'styled-components'
import { useState } from 'react'
import Modal from '../Modal'
import Button from '../Button'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledInput = styled.input`
  font-size: ${({ theme }) => theme.sizes.fonts.primaryText};
  line-height: 35px;
  background: #FFFFFF;
  border: 1px solid #B1B1B1;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0px 10px 0px 10px;
  font-family: ${({ theme }) => theme.fonts.primary};
  min-width: 270px;
  margin: 20px 0px 0px 0px;
`

const StyledButton = styled(Button)`
  margin: 20px 0px 0px 0px;
`
const CreateModal = ({ isShow, onClose, getBooks }) => {
  const [form, setForm] = useState({
    name: '',
    author: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const addBook = () => {
    fetch('http://localhost:1717/books/create', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => getBooks())
    onClose()
  }

  return (
    <Modal
      isShow={isShow}
      onClose={onClose}
    >
      <StyledForm action="#">
        <StyledInput
          type="text"
          name="name"
          placeholder="Book Name"
          value={form.name}
          onChange={handleChange}
        />
        <StyledInput
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
        />
        <StyledButton
          type="submit"
          onClick={addBook}
        >Add Book
        </StyledButton>
      </StyledForm>
    </Modal>
  )
}

export default CreateModal
