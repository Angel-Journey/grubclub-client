import React, { Component } from 'react'
import { indexPotlucks, deletePotluck, updatePotluck } from '../../api/potlucks'
import { deleteItem } from '../../api/items'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Spinner from 'react-bootstrap/Spinner'

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
        heading: 'Potluck indexing failed ' + error.message,
        message: messages.indexPotluckFailure,
        variant: 'danger'
      }))
      .then(() => msgAlert({
        heading: 'Success!',
        message: messages.indexPotluckSuccess,
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
        heading: 'Potluck update failed ' + error.message,
        message: messages.updatePotluckFailure,
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
        heading: 'Potluck deletion failed ' + error.message,
        message: messages.deletePotluckFailure,
        variant: 'danger'
      }))
  }

  itemDelete = (event) => {
    const itemId = event.target.getAttribute('item-id')
    const potluckId = event.target.getAttribute('potluck-id')
    const { user, msgAlert, history } = this.props
    deleteItem(user, itemId, potluckId)
      // .then(() => msgAlert({
      //   heading: 'Success!.',
      //   message: messages.deletePostSuccess,
      //   variant: 'success'
      // }))
      .then(() => history.push('/'))
      .then(() => history.push('/index-potlucks'))
      .catch(error => msgAlert({
        heading: 'Item deletion failed ' + error.message,
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
        <Spinner animation="border" variant="primary" />
      )
    } else if (potlucks.length === 0) {
      potlucksJsx = (
        <div>
          <p>No potlucks to display! Go add a potluck!</p>
          <Button
            variant="primary"
            href={'#create-potluck'}
          >
            Add Potluck</Button>
        </div>
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
        <div>
          <Button
            className="button"
            variant="secondary"
            href={'#create-potluck'}
          >
            Add Potluck</Button>
          <p></p>
          <ul className="list">
            <Card border="primary">
              {potlucks.slice(0).reverse().map(potluck => (
                <li key={potluck._id}>
                  <ul>
                    <li>{potluck.title}</li>
                    <li>Location: {potluck.location}</li>
                    <li>{(new Date(potluck.date)).toDateString()}</li>
                    <li>{(new Date(potluck.date)).toTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric', timeZone: 'America/Chicago' })}</li>
                    <li>Details: {potluck.body}</li>
                  </ul>
                  {/*  <div className="timestamp">
                    {(new Date(potluck.createdAt)).toDateString()}
                    <span> </span>
                    {(new Date(potluck.createdAt)).toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })}
                  </div> */}
                  <Button
                    variant="danger"
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
                  {<Accordion>
                    <Card border="primary">
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="info" eventKey="0">
                          View items for {potluck.title}
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <Button
                            variant="secondary"
                            className="button"
                            type="button"
                            href={`#/create-item/${potluck._id}`}>
                              Add Item</Button>
                          {potluck.items.map(item => (
                            <div key={item._id}>
                              <Card.Body>
                                <Card border="secondary">
                                  <Card.Body>
                                    {item.name} by {item.ownerEmail}
                                  </Card.Body>
                                </Card>
                                {this.props.user._id === item.owner
                                  ? <Button
                                    className="button"
                                    variant="danger"
                                    onClick={this.itemDelete}
                                    potluck-id={potluck._id}
                                    item-id={item._id}
                                    // href={`#/items/${item._id}/delete-item/${potluck._id}`}
                                  >
                                    Delete</Button> : ''}
                                {this.props.user._id === item.owner
                                  ? <Button
                                    className="button"
                                    variant="secondary"
                                    // onClick={this.itemUpdate}
                                    // potluck-id={potluck._id}
                                    // item-id={item._id}
                                    href={`#/items/${item._id}/edit-item/${potluck._id}`}
                                  >
                                    Edit</Button> : ''}
                                <div className="item-separator">
                                </div>
                              </Card.Body>
                            </div>
                          ))}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card bg="primary" border="primary">
                    </Card>
                  </Accordion>}
                  <p></p>
                </li>
              ))}
            </Card>
          </ul>
        </div>
      )
    }

    return (
      <div className="row d-flex">
        <div className="col-sm-10 col-md-8 mx-auto mt-5 mainbox">
          <Card border="primary">
            <Card.Header>My Potlucks</Card.Header>
            <Card.Body>
              {potlucksJsx}
            </Card.Body>
          </Card>
        </div>
      </div>
    )
  }
}

export default withRouter(IndexPotlucks)
