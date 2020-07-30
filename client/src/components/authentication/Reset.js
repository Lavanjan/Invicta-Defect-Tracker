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
const { Header, Footer, Sider, Content } = Layout;
// import axios from "axios";
// import FormItem from "antd/lib/form/FormItem";

const Reset = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const success = () => {
    message.success("Login Successfully !");
  };
  const invalid = () => {
    message.warning("Username or Password Invalid");
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

    fetch("http://localhost:5000/user/reset-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          // alert(data.error);
          invalid();
        } else {
            message.success(data.message);
          history.push("/");
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
      {/* <div className = "login-top"> */}
      <Layout>
        <Header>
        <div className="logo" />
        </Header>
        <Content style={{ marginTop: "7%", marginBottom: "6%" }}>
          <Row justify="space-around">
            <Col span={7}>
              <Card title="Login">
                <Form
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
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
                      placeholder="Username"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      onClick={() => PostData()}
                    >
                      Reset password
                    </Button>
                    {/* <div className="acc-signIn"> */}
                    {/* </div> */}
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

export default Reset;
