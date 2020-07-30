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
import { useHistory, Link, useParams } from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;

const SignIn = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const {token} = useParams();
  console.log(token);
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

    fetch("http://localhost:5000/user/new-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token
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
                      placeholder="Enter a new password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      onClick={() => PostData()}
                    >
                      Update Password
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

export default SignIn;
