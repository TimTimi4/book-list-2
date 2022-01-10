import { MODAL_SET_SHOW } from '../constants'

export const showModal = (modalName, isShow) => ({
  type: MODAL_SET_SHOW,
  modalName,
  isShow,
})
