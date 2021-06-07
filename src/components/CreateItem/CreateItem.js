import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'
import { createItem } from '../../api/items'
import messages from '../AutoDismissAlert/messages'

class CreateItem extends Component {
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

  onCreateItem = event => {
    event.preventDefault()

    const { user, msgAlert } = this.props
    const { potluckId } = this.props.match.params

    createItem(this.state, user, potluckId)
      // .then(() => msgAlert({
      //   heading: 'Create Post Success',
      //   message: messages.createPostSuccess,
      //   variant: 'success'
      // }))
      // .then(() => history.push('/index-potlucks'))
      .catch(error => {
        this.setState({ body: '' })
        msgAlert({
          heading: 'Create item failed with error: ' + error.message,
          message: messages.createItemFailure,
          variant: 'danger'
        })
      })
  }

  goBack () {
    this.props.history.goBack()
  }

  render () {
    const { name } = this.state

    return (
      <div className="row form mainbox">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <p className="ptitles">Add Item to Potluck</p>
          <Form onSubmit={this.onCreateItem}>
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
              Add Item
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

export default withRouter(CreateItem)
