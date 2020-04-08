import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { connect } from "react-redux";
import * as emailAuthActions from "../redux/actions";
import classnames from "classnames";
import { emailRegEx } from "../../../utils";


class Register extends Component {
  state = {
    email: "",
    password: "",
    confirmPass: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  submitSignUp = async () => {
    const { signUp } = this.props;

    const { email, password, confirmPass } = this.state;

    if (!emailRegEx.test(email)) {
      this.setState({
        message: "Email is not valid!",
        messageType: "error",
      });
      return;
    }

    if (password.length < 8) {
      this.setState({
        message: "Password should be longer than 8 letters!",
        messageType: "error",
      });
      return;
    }

    if (password !== confirmPass) {
      this.setState({
        message: "Confirm password does not match!",
        messageType: "error",
      });
      return;
    }

    await signUp({ email, password });

  };

  render() {
    let { message, messageType } = this.state;
    const { signUpErrors, loggedIn } = this.props;

    if (!message && signUpErrors) {
      message = signUpErrors;
      messageType = "error";
    }

    if (loggedIn) {
      this.props.history.push(`/`);
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    {
                      message && (
                        <div
                          className={classnames("alert", {
                            "alert-success": messageType === "success",
                            "alert-danger": messageType === "error",
                          })}
                          role="alert"
                        >
                          { message }
                        </div>
                      )
                    }
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                        name="email"
                        required
                        onChange={this.onChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        name="password"
                        required
                        onChange={this.onChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        name="confirmPass"
                        required
                        onChange={this.onChange}
                      />
                    </InputGroup>
                    <Button onClick={this.submitSignUp} color="success" block>
                      Create Account
                    </Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <span className="px-2">You already have account?</span>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button
                        color="primary"
                        className="px-4"
                        block
                        onClick={() => this.props.history.push(`/login`)}
                      >
                        <span>Login</span>
                      </Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signUpErrors: state.EmailAuth.errors.SignUp
});

const mapDispatchToProps = {
  signUp: emailAuthActions.signUp
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
