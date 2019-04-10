/* import React from "react"

export default () => (
  <form
    name="contact"
    method="post"
    action="/success"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    <input type="hidden" name="bot-field" />
    <div>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" />
    </div>
    <div>
      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="email" />
    </div>
    <div>
      <label htmlFor="message">Message</label>
      <textarea name="message" id="message" rows="6" required />
    </div>
    <div>
      <input type="submit" value="Drop a line" />
      <input type="reset" value="Eraser" />
    </div>
  </form>
)
 */
/**
 * changes made to this component
 * transformed it from a stateless functional component to a full blown class component.
 * Added a state to hold the inputs and then encode them (through encode function) and post a request to netlify
 * Added gatsby navigate import to make the routing done in a internal fashion as it would lead to 404 and the data not added. 
 * See my comment on your issue
 */

import React, { Component } from "react"
import { navigate } from "gatsby"

class ContactForm extends Component {
  constructor(props) {
    super(props)
    this.ContactForm = React.createRef()
    this.state = {}
  }
  encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = this.ContactForm.current

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: this.encode({
        "form-name": form.getAttribute("name"),
        ...this.state,
      }),
    })
      .then(response => {
        console.log("====================================")
        console.log(`${JSON.stringify(response, null, 2)}`)
        console.log("====================================")
        navigate(form.getAttribute("action"))
      })
      .catch(error => {
        console.log("====================================")
        console.log(`error in submiting the form data:${error}`)
        console.log("====================================")
      })
  }
  render() {
    return (
      <form
        name="contact"
        method="post"
        action="/success/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={this.handleSubmit}
        ref={this.ContactForm}
      >
        <input type="hidden" name="form-name" value="contact" />
        <p hidden>
          <label>
            Don’t fill this out:{" "}
            <input name="bot-field" onChange={this.handleChange} />
          </label>
        </p>
        <p>
          <label>
            Your name:
            <br />
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
        </p>
        <p>
          <label>
            Your email:
            <br />
            <input type="email" name="email" onChange={this.handleChange} />
          </label>
        </p>
        <p>
          <label>
            Message:
            <br />
            <textarea name="message" onChange={this.handleChange} />
          </label>
        </p>
        <p>
          <button type="submit">Send</button>
          <input type="reset" value="Eraser" />
        </p>
      </form>
    )
  }
}
export default ContactForm
