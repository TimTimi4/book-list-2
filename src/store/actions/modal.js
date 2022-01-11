import { MODAL_SET_SHOW, MODAL_CHANGE_FORM_FIELD } from '../constants'

export const showModal = (modalName, isShow) => ({
  type: MODAL_SET_SHOW,
  modalName,
  isShow,
})

export const changeModalForm = (modalName, fieldName, value) => ({
  type: MODAL_CHANGE_FORM_FIELD,
  modalName,
  fieldName,
  value,
})
