import React, { Component, useState, Fragment } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Card,
  message,
  Layout,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import FormItem from "antd/lib/form/FormItem";

const { Header, Footer, Sider, Content } = Layout;

const Signup = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const success = () => {
    message.success("Email has been sent! Confirm your Email Address.");
  };
  const invalid = () => {
    message.warning("Please Fill All Fields");
  };
  const emailInvalid = () => {
    message.error("Invalid Email Format");
  };

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      // alert("invalid Email");
      emailInvalid();
      return;
    }

    fetch("http://localhost:5000/user/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          message.warning(data.error);
          //   alert(data.error);
          //   invalid();
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          // alert("ligin Success");
          success();
          //   message.warning(data.error);
          history.push("/confirm-email-address");
        }
      });
  };

  const onFinish = (values) => {
    console.log("Success: ", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
  };

  return (
    <Fragment>
      {/* <div className="login-top"> */}
      <Layout>
        <Header>
        <div className="logo" />
        </Header>
        <Content style={{ marginTop: "7%", marginBottom: "6%" }}>
          <Row justify="space-around">
            <Col span={7}>
              <Card title="Signup Account">
                <Form
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    name="userName"
                    value={userName}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Username!",
                      },
                    ]}
                    onChange={(e) => setUserName(e.target.value)}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Username"
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    value={email}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                    ]}
                    onChange={(e) => setEmail(e.target.value)}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Email"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    value={password}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                    onChange={(e) => setPassword(e.target.value)}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      onClick={() => PostData()}
                    >
                      Signup
                    </Button>
                    <div className="acc-signIn">
                      <Link to="/">
                        <a href="">Already I have an Account ?</a>
                      </Link>
                    </div>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Invicta Defect Tracker System ©2020
        </Footer>
      </Layout>
      {/* </div> */}
    </Fragment>
  );
};

export default Signup;
