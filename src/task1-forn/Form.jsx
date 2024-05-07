import  { useState } from "react";

export default function Form() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    body: ""
  });

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.name && values.email && values.body) {
      setValid(true);
    }
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        {submitted && valid && (
          <div className="success-message">
            <div>
              <h2>Add Comment</h2>
            <h4>Name: {values.name}
              </h4>  
              <h4>Email :{values.email}</h4>
              <h4>Body :{values.body}</h4>
            </div>
          </div>
        )}
        {!valid && (
          <input
            className="form-field"
            type="text"
            placeholder="Name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.name && (
          <span id="name-error">Please enter Name</span>
        )}

        {!valid && (
          <input
          className="form-field"
            type="text"
            placeholder="email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.email && (
          <span id="last-name-error">Please enter  Email</span>
        )}

        {!valid && (
          <input
          className="form-field"
            type="body"
            placeholder="body"
            name="body"
            value={values.body}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.body && (
          <span id="body-error">Please enter an Body</span>
        )}
        {!valid && (
          <button className="form-field" type="submit">
            Add Comment
          </button>
        )}
      </form>
    </div>
  );
}


