import React, { Component } from 'react'
import { indexPotlucks, deletePotluck, updatePotluck } from '../../api/potlucks'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class IndexPotlucks extends Component {
  constructor (props) {
    super(props)

    this.state = {
      potlucks: null,
      title: '',
      location: '',
      date: '',
      body: '',
      formDisplay: false,
      formBody: '',
      formId: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexPotlucks(user)
      .then(res => this.setState({ potlucks: res.data.potlucks }))
      .catch(error => msgAlert({
        heading: 'Post indexing failed ' + error.message,
        message: messages.indexPostFailure,
        variant: 'danger'
      }))
      .then(() => msgAlert({
        heading: 'Success!',
        message: messages.indexPostSuccess,
        variant: 'success'
      }))
  }

  showEditForm = (event) => {
    event.preventDefault()
    this.setState({
      formDisplay: true,
      formId: event.target.getAttribute('data-id')
    })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  potluckUpdate = (event) => {
    console.log(event)
    event.preventDefault()
    const { title, location, date, body, formId } = this.state
    const { user, msgAlert, history } = this.props
    updatePotluck(user, formId, title, location, date, body)
      .then(() => this.setState({
        formId: null,
        formBody: '',
        formDisplay: false
      }))
      // .then(() => msgAlert({
      //   heading: 'Success!',
      //   message: messages.updatePostSuccess,
      //   variant: 'success'
      // }))
      .then(() => history.push('/'))
      .then(() => history.push('/index-potlucks'))
      .catch(error => msgAlert({
        heading: 'Post update failed ' + error.message,
        message: messages.updatePostFailure,
        variant: 'danger'
      }))
  }

  potluckDelete = (event) => {
    const id = event.target.getAttribute('data-id')
    const { user, msgAlert, history } = this.props
    deletePotluck(user, id)
      // .then(() => msgAlert({
      //   heading: 'Success!.',
      //   message: messages.deletePostSuccess,
      //   variant: 'success'
      // }))
      .then(() => history.push('/'))
      .then(() => history.push('/index-potlucks'))
      .catch(error => msgAlert({
        heading: 'Post deletion failed ' + error.message,
        message: messages.deletePostFailure,
        variant: 'danger'
      }))
  }

  goBack = event => {
    this.setState({ formDisplay: false, formId: null })
  }

  render () {
    const { potlucks, formDisplay, title, location, date, body } = this.state

    let potlucksJsx = ''
    // here we manage states (1. loading 2. no posts 3. display posts)
    if (potlucks === null) {
      potlucksJsx = (
        <p>Loading...</p>
      )
    } else if (potlucks.length === 0) {
      potlucksJsx = (
        <p>No potlucks to display! Go create a potluck!</p>
      )
    } else if (formDisplay) {
      potlucksJsx = (
        <Form onSubmit={this.potluckUpdate}>
          <Form.Group controlId="title">
            <Form.Control
              // required
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
              // required
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
              // required
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
              // required
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
              Update
          </Button>
          <Button
            variant="secondary"
            className="button"
            type="button"
            onClick={this.goBack}
          >Go Back</Button>
        </Form>
      )
    } else {
      potlucksJsx = (
        <ul className="list">
          {potlucks.slice(0).reverse().map(potluck => (
            <li key={potluck._id} className="linebetween">
              <ul>
                <li>{potluck.title}</li>
                <li>{potluck.location}</li>
                <li>{(new Date(potluck.date)).toLocaleString()}</li>
                <li>{potluck.body}</li>
              </ul>
              <div className="timestamp">
                {(new Date(potluck.createdAt)).toDateString()}
                <span> </span>
                {(new Date(potluck.createdAt)).toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })}
              </div>
              <Button
                variant="primary"
                className="button"
                type="button"
                onClick={this.potluckDelete}
                data-id={potluck._id}
              >
                Delete
              </Button>
              <Button
                className="button"
                variant="secondary"
                type="button"
                onClick={this.showEditForm}
                data-id={potluck._id}
              >
                Edit
              </Button>
            </li>
          ))}
        </ul>
      )
    }

    return (
      <div className="row d-flex">
        <div className="col-sm-10 col-md-8 mx-auto mt-5 feedbox">
          <p className="ptitles">Your Potlucks</p>
          {potlucksJsx}
        </div>
      </div>
    )
  }
}

export default withRouter(IndexPotlucks)
