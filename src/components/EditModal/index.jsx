import styled from 'styled-components'
import Modal from '../Modal'
import Button from '../Button'
import Like from '../Icons/Like'

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
const IconBox = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 35px;
  height: 35px;
  background-color: #EDEDED;
  border-radius: 10px;
`

const StyledLIkeIcon = styled(Like)`
  position: absolute;
  top:10px;
  left: 8px;
  color: ${({ theme, $isFavorite }) => ($isFavorite ? theme.colors.activeIcon : theme.colors.unactiveIcon)};
  cursor: pointer;
`

const EditModal = ({ isShow, onClose, setEditState, editState, getBooks }) => {
  const handlechange = (e) => {
    const { name, value } = e.target
    setEditState({
      ...editState,
      [name]: value,
    })
  }

  const handleclick = () => {
    setEditState({
      ...editState,
      isFavorite: !editState.isFavorite,
    })
  }

  const saveChanges = () => {
    const body = {
      ...editState,
    }
    delete body.id
    fetch(`http://localhost:1717/books/update/${editState.id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
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
          value={editState ? editState.name : ''}
          onChange={handlechange}
        />
        <StyledInput
          type="text"
          name="author"
          placeholder="Author"
          value={editState ? editState.author : ''}
          onChange={handlechange}
        />
        <StyledButton
          type="submit"
          onClick={saveChanges}
        >Save
        </StyledButton>
        <IconBox>
          <StyledLIkeIcon
            onClick={handleclick}
            $isFavorite={!!editState?.isFavorite}
          />
        </IconBox>
      </StyledForm>
    </Modal>
  )
}

export default EditModal
