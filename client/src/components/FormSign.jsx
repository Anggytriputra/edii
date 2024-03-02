import React from "react";

export default function FormSign({
  Header,
  desc,
  buttonSignText,
  handleSubmit,
  path,
}) {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <main className="form-signin">
            <h1 className="h3 mb-3 fw-normal text-center">{Header}</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="name@example.com"
                  autoFocus
                  required
                />
                <label for="email">Email address</label>
                <div className="invalid-feedback"></div>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                <label for="password">Password</label>
              </div>

              <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
              >
                {buttonSignText}
              </button>
            </form>
            <small className="d-block text-center mt-3">
              {desc} <a href={path}>Register Now!</a>
            </small>
          </main>
        </div>
      </div>
    </>
  );
}
