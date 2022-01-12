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

const EditModal = ({
  isShow,
  onClose,
  handleChangeModalForm,
  editState,
  saveEditBook,
  clickFavoriteEditForm }) => (
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
          onChange={handleChangeModalForm}
        />
        <StyledInput
          type="text"
          name="author"
          placeholder="Author"
          value={editState ? editState.author : ''}
          onChange={handleChangeModalForm}
        />
        <StyledButton
          type="submit"
          onClick={saveEditBook}
        >Save
        </StyledButton>
        <IconBox>
          <StyledLIkeIcon
            $isFavorite={!!editState?.isFavorite}
            onClick={clickFavoriteEditForm}
          />
        </IconBox>
      </StyledForm>
    </Modal>
)

export default EditModal
