import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'
import { updateItem } from '../../api/items'
import messages from '../AutoDismissAlert/messages'

class UpdateItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: ''
    }

    this.goBack = this.goBack.bind(this)
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onUpdateItem = event => {
    event.preventDefault()

    const { user, msgAlert } = this.props
    const { itemId, potluckId } = this.props.match.params

    updateItem(this.state, itemId, user, potluckId)
      // .then(() => msgAlert({
      //   heading: 'Update Item Success',
      //   message: messages.createItemSuccess,
      //   variant: 'success'
      // }))
      // .then(() => history.push('/index-potlucks-all'))
      .catch(error => {
        this.setState({ body: '' })
        msgAlert({
          heading: 'Update Item failed with error: ' + error.message,
          message: messages.createItemFailure,
          variant: 'danger'
        })
      })
  }

  // goBack = event => {
  //   const { history } = this.props
  //   history.push('/index-potlucks-all')
  // }

  goBack () {
    this.props.history.goBack()
  }

  render () {
    const { name } = this.state

    return (
      <div className="row form">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <p className="ptitles">Update Item</p>
          <Form onSubmit={this.onUpdateItem}>
            <Form.Group controlId="title">
              <Form.Control
                required
                className="field"
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              className="button"
              variant="primary"
              type="submit"
              onClick={this.goBack}
            >
              Update Item
            </Button>
            <Button
              variant="secondary"
              className="button"
              type="button"
              onClick={this.goBack}
            >Go Back</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(UpdateItem)
