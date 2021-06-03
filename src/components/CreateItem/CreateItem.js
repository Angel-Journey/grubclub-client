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
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreateItem = event => {
    event.preventDefault()

    const { user, msgAlert, history } = this.props
    const { potluckId } = this.props.match.params

    createItem(this.state, user, potluckId)
      // .then(() => msgAlert({
      //   heading: 'Create Post Success',
      //   message: messages.createPostSuccess,
      //   variant: 'success'
      // }))
      .then(() => history.push('/index-potlucks'))
      .catch(error => {
        this.setState({ body: '' })
        msgAlert({
          heading: 'Create post failed with error: ' + error.message,
          message: messages.createPostFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name } = this.state

    return (
      <div className="row form">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <p className="ptitles">Create Item</p>
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
            >
              Add Item
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(CreateItem)
