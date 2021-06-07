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

    this.goBack = this.goBack.bind(this)
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreatePotluck = event => {
    event.preventDefault()

    const { user, msgAlert } = this.props

    createPotluck(this.state, user)
      // .then(() => msgAlert({
      //   heading: 'Create Post Success',
      //   message: messages.createPostSuccess,
      //   variant: 'success'
      // }))
      // .then(() => history.push('/index-potlucks'))
      .catch(error => {
        this.setState({ body: '' })
        msgAlert({
          heading: 'Create potluck failed with error: ' + error.message,
          message: messages.createPotluckFailure,
          variant: 'danger'
        })
      })
  }

  goBack () {
    this.props.history.goBack()
  }

  render () {
    const { title, location, date, body } = this.state

    return (
      <div className="row form mainbox">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <p className="ptitles">Add Potluck</p>
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
                type="datetime-local"
                name="date"
                value={date}
                placeholder=''
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
              onClick={this.goBack}
            >
              Add Potluck
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

export default withRouter(CreatePotluck)
