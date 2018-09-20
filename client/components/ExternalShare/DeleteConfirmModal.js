// @flow
import React from 'react';
import { translate } from 'react-i18next'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap'

type Props = {
  show: boolean,
  onHide: Function,
  handleDelete: Function,
  handleClose: Function,
  t: Function,
};

class DeleteConfirmModal extends React.Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      error: false,
    }

    this.handleDelete = this.handleDelete.bind(this)
  }

  props: Props;

  async handleDelete() {
    const { handleClose, handleDelete } = this.props
    this.setState({ error: false })
    const error = await handleDelete()
    if (error !== null) {
      this.setState({ error: true })
    } else {
      handleClose()
    }
  }

  render() {
    const { show, onHide, t } = this.props
    const { error } = this.state
    return (
      <Modal isOpen={show} toggle={onHide}>
        <ModalHeader toggle={onHide}>{t('Delete shared link to this page?')}</ModalHeader>
        <ModalBody>
          {error && <Alert color="danger">{t('share.error.can_not_delete')}</Alert>}
          <p>{t('No one can see this page if the link is deleted')}</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onHide}>{t('Cancel')}</Button>
          <Button onClick={this.handleDelete} color="danger">
            {t('Delete')}
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

DeleteConfirmModal.defaultProps = {
  show: false,
}

export default translate()(DeleteConfirmModal)
