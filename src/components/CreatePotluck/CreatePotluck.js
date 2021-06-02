import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'
import { createPotluck } from '../../api/potlucks'
import messages from '../AutoDismissAlert/messages'

class CreatePotluck extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      location: '',
      date: '',
      body: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreatePotluck = event => {
    event.preventDefault()

    const { user, msgAlert, history } = this.props

    createPotluck(this.state, user)
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
    const { title, location, date, body } = this.state

    return (
      <div className="row form">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <p className="ptitles">Create Potluck</p>
          <Form onSubmit={this.onCreatePotluck}>
            <Form.Group controlId="title">
              <Form.Control
                required
                className="field"
                type="text"
                name="title"
                value={title}
                placeholder="Title"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Control
                required
                className="field"
                type="text"
                name="location"
                value={location}
                placeholder="Location"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Control
                required
                className="field"
                type="date"
                name="date"
                value={date}
                placeholder='Date.now()'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="body">
              <Form.Control
                required
                className="field"
                type="text"
                name="body"
                value={body}
                placeholder="Details"
                as="textarea"
                rows={3}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              className="button"
              variant="primary"
              type="submit"
            >
              Post
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(CreatePotluck)
