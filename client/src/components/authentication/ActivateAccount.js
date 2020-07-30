import React, { Component, Fragment } from "react";
import { Layout, Result, Button, Row, Col, Card, Tooltip } from "antd";
import {
  SmileOutlined,
  GoogleOutlined,
  WindowsOutlined,
  YahooOutlined,
  SmileTwoTone,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;
export class ActivateAccount extends Component {
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
                  status="success"
                  title="Successfully Verified Your Account !"
                  subTitle="Please click Sign in to continue your Defect Tracker Account."
                  extra={[
                    <Link to="/">
                      <Button type="primary" key="console">
                        Sign in
                      </Button>
                    </Link>,
                  ]}
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

export default ActivateAccount;
