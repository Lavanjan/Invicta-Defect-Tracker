import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Dropdown, Col } from "antd";
import "antd/dist/antd.css";
import "./../index.css";
import { Switch, Link, useHistory } from "react-router-dom";
import {
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  AppstoreAddOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import Body from "./../components/body/body";

const Layouts = () => {
  const history = useHistory();

  const { Header, Content, Footer } = Layout;
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          <UserOutlined />
          &nbsp;&nbsp;My Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" href="/manage-project">
          <AppstoreAddOutlined />
          &nbsp;&nbsp;Manage Project
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="/employee" rel="noopener noreferrer">
          <UserAddOutlined />
          &nbsp;&nbsp;Manage Employee
        </a>
      </Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          <UserOutlined />
          &nbsp;&nbsp;My Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          onClick={() => {
            localStorage.clear();
            history.push("/");
          }}
          rel="noopener noreferrer"
        >
          <LogoutOutlined />
          &nbsp;&nbsp;SignOut
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Layout className="layout">
        <Header>
          <Link to="/home">
            <div className="logo" />
            <HomeOutlined
              style={{ fontSize: "30px", color: "white", marginTop: 18 }}
            />
          </Link>
          <div className="sub">
            <Dropdown overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <SettingOutlined style={{ fontSize: 20 }} />
              </a>
            </Dropdown>
          </div>
          <div className="user-menu">
            <Dropdown overlay={userMenu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <UserOutlined style={{ fontSize: 20 }} />
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          {/* <Link to="/"> */}
            <Breadcrumb style={{ margin: "16px 0" }}>
              &nbsp;&nbsp;&nbsp;
              <Breadcrumb.Item>Invicta Defect Tracker System</Breadcrumb.Item>
            </Breadcrumb>
          {/* </Link> */}
          <div className="site-layout-content">
            <Switch>
              <Body />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Invicta Defect Tracker System ©2020
        </Footer>
      </Layout>
    </div>
  );
};

export default Layouts;
