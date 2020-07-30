import React, { Component, Fragment } from "react";
import { Layout, Result, Button, Row, Col, Card, Tooltip } from "antd";
import { SmileOutlined, GoogleOutlined, WindowsOutlined, YahooOutlined, SmileTwoTone  } from "@ant-design/icons";
import { Link } from 'react-router-dom'

const { Header, Footer, Sider, Content } = Layout;
export class ConfirmEmail extends Component {
  render() {
    return (
      <Fragment>
        <Layout>
          <Header>
            <div className="logo" />
          </Header>
          <Content style={{ marginTop: "7%", marginBottom: "9%" }}>
            <Row justify="space-around">
              <Col span={12}>
                {/* <Card title="Signup Account"> */}
                <Result
                  icon={<SmileTwoTone twoToneColor="#52c41a" />}
                  title="Congratulations, Your Account Registered Successfully. Please Verify Your Email"
                  subTitle="Please verify your email for done all the operations purpose!"
                  extra={
                    <Fragment>
                    <Tooltip title="Gmail">
                      <Button
                        type="dashed"
                        shape="circle"
                        icon={<GoogleOutlined />}
                      />
                    </Tooltip>
                    <Tooltip title="Outlook">
                    <Button
                      type="dashed"
                      shape="circle"
                      icon={<WindowsOutlined />}
                    />
                  </Tooltip>
                  <Tooltip title="Yahoo">
                  <Button
                    type="dashed"
                    shape="circle"
                    icon={ <YahooOutlined /> }
                  />
                </Tooltip>
                </Fragment>
                  }
                />
                {/* </Card> */}
              </Col>
            </Row>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              position: "fixed",
              bottom: 0,
              width: "100%",
            }}
          >
            Invicta Defect Tracker System ©2020
          </Footer>
        </Layout>
      </Fragment>
    );
  }
}

export default ConfirmEmail;
