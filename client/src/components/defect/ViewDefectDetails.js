import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Input,
  Button,
  Space,
  Tag,
  Badge,
  notification,
  Modal,
  Descriptions,
  Progress,
  Card,
  Divider,
  Avatar,
} from "antd";
import { connect } from 'react-redux';
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  FallOutlined,
  RiseOutlined,
  StockOutlined,
  BugOutlined,
  EditOutlined,
  RadarChartOutlined,
  FolderViewOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { Drawer, Form, Col, Row, Select, Typography, Statistic, message } from "antd";
import axios from "axios";
import AddDefectDetailsForm from "./AddDefectDetailsForm";
import { viewDefectAddDrawerForm } from '../redux/action/ActionDefect';
const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Notification Title",
    description: "This is Notification",
  });
};

export class ViewDefectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      defectsId: "",
      defectsName: "",
      stepToRecreate: "",
      type: "",
      status: "",
      severity: "",
      priority: "",
      enteredBy: "",
      foundIn: "",
      availableIn: "",
      assignTo: "",
      module: "",
      subModule: "",
      high: 0,
      medium: 0,
      low: 0,
      newdef: 0,
      opendef: 0,
      ropendef: 0,
      newHigh: 0,
      newMedium: 0,
      newLow: 0,
      openHigh: 0,
      openMedium: 0,
      openLow: 0,
      ropenHigh: 0,
      ropenMedium: 0,
      ropenLow: 0,
      severityTotal: [],
      selectedRows: [],
      selectedData: [],
      rId: "",
      putData: [],
      filteredInfo: null,
      sortedInfo: null,
      searchText: "",
      searchedColumn: "",
      visible: false,
      viewDrawerVisible: false,
      data: [],
      loading: false,
      show: false,
      drawerData: {},
      totalHigher: "",
      viewFormVisible: false,
      updateformVisible: false,
      record: '',
      upRecord: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  filterHandleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  handleSelect = (name, value) => {
    if (name === "type") {
      this.setState({
        type: value,
      });
    } else if (name === "status") {
      this.setState({
        status: value,
      });
    } else if (name === "severity") {
      this.setState({
        severity: value,
      });
    } else if (name === "priority") {
      this.setState({
        priority: value,
      });
    } else if (name === "enteredBy") {
      this.setState({
        enteredBy: value,
      });
    } else if (name === "assignTo") {
      this.setState({
        assignTo: value,
      });
    } else if (name === "foundIn") {
      this.setState({
        foundIn: value,
      });
    } else if (name === "availableIn") {
      this.setState({
        availableIn: value,
      });
    } else if (name === "module") {
      this.setState({
        module: value,
      });
    } else if (name === "submodule") {
      this.setState({
        subModule: value,
      });
    }
  };

  create = (data) => {
    axios
      .post(
        "http://localhost:5000/defects",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        },
        data
      )
      .then((res) => { });
  };

  onViewViewform = (record) => {
    this.setState({
      viewFormVisible: true,
      record: record
    })
  };
  onCloseViewForm = () => {
    this.setState({
      viewFormVisible: false
    })
  }
  onViewUpdateForm = (record) => {
    this.setState({
      rId: record._id,
      upRecord: record,
      viewFormVisible: false,
      updateformVisible: true,
      defectsName: record.defectsName,
      type: record.type,
      defectsId: record.defectsId,
      stepToRecreate: record.stepToRecreate,
      status: record.status,
      severity: record.severity,
      priority: record.priority,
      enteredBy: record.enteredBy,
      assignTo: record.assignTo,
      foundIn: record.foundIn,
      availableIn: record.availableIn,
      module: record.module,
      subModule: record.subModule,
    })
  }
  onCloseUpdateForm = () => {
    this.setState({
      updateformVisible: false
    })
  }
  onBack = () => {
    this.setState({
      updateformVisible: false,
      viewFormVisible: true,
    })
  }
  getAll() {
    axios
      .get("http://localhost:5000/defects", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .then(() => {
        for (let i = 0; i < this.state.data.length; i++) {
          if (this.state.data[i].status === "New") {
            switch (this.state.data[i].severity) {
              case "High":
                this.setState({
                  newHigh: this.state.newHigh + 1,
                });
                break;
              case "Medium":
                this.setState({
                  newMedium: this.state.newMedium + 1,
                });
                break;
              case "Low":
                this.setState({
                  newLow: this.state.newLow + 1,
                });
                break;
            }
          } else if (this.state.data[i].status === "Open") {
            switch (this.state.data[i].severity) {
              case "High":
                this.setState({
                  openHigh: this.state.openHigh + 1,
                });
                break;
              case "Medium":
                this.setState({
                  openMedium: this.state.openMedium + 1,
                });
                break;
              case "Low":
                this.setState({
                  openLow: this.state.openLow + 1,
                });
                break;
            }
          }
          if (this.state.data[i].status === "Re-open") {
            switch (this.state.data[i].severity) {
              case "High":
                this.setState({
                  ropenHigh: this.state.ropenHigh + 1,
                });
                break;
              case "Medium":
                this.setState({
                  ropenMedium: this.state.ropenMedium + 1,
                });
                break;
              case "Low":
                this.setState({
                  ropenLow: this.state.ropenLow + 1,
                });
                break;
            }
          }
          switch (this.state.data[i].severity) {
            case "High":
              this.setState({
                high: this.state.high + 1,
              });
              break;
            case "Medium":
              this.setState({
                medium: this.state.medium + 1,
              });
              break;
            case "Low":
              this.setState({
                low: this.state.low + 1,
              });
              break;
          }

          switch (this.state.data[i].status) {
            case "New":
              this.setState({
                newdef: this.state.newdef + 1,
              });
              break;
          }
          switch (this.state.data[i].status) {
            case "Open":
              this.setState({
                opendef: this.state.opendef + 1,
              });
              break;
          }
          switch (this.state.data[i].status) {
            case "Re-open":
              this.setState({
                ropendef: this.state.ropendef + 1,
              });
              break;
          }
        }
      });
  }
  componentDidMount() {
    this.getAll();
  }
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
              this.handleSearch(selectedKeys, confirm, dataIndex)
            }
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
          </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
          </Button>
          </Space>
        </div>
      ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
          text
        ),
  });
  handleSubmit = (e) => {
    const data = {
      defectsId: this.state.defectsId,
      defectsName: this.state.defectsName,
      type: this.state.type,
      stepToRecreate: this.state.stepToRecreate,
      status: this.state.status,
      severity: this.state.severity,
      priority: this.state.priority,
      enteredBy: this.state.enteredBy,
      foundIn: this.state.foundIn,
      availableIn: this.state.availableIn,
      module: this.state.module,
      subModule: this.state.subModule,
      assignTo: this.state.assignTo,
    };
    console.log(data);
    axios
      .put(`http://localhost:5000/defects/update/${this.state.rId}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }).then(()=>{
        this.onCloseUpdateForm()
      })
    message
      .success("Update Successfully")
      .then(() => {        
        window.location.reload();

      })


  };

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    let locale = {
      filterReset: "All",
    };
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "ID",
        width: "1%",
        dataIndex: "defectsId",
        key: "defectsId",
        sorter: (a, b) => a.defectsId - b.defectsId,
        // defaultSortOrder: "descend",
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Defect Description",
        dataIndex: "defectsName",
        key: "defectsName",
        ...this.getColumnSearchProps("defectsName"),
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        filters: [
          {
            text: "Functional",
            value: "Functional",
          },
          {
            text: "Performance",
            value: "Performance",
          },
          {
            text: "UI",
            value: "UI",
          },
        ],
        // filterMultiple: false,
        filteredValue: filteredInfo.type || null,
        onFilter: (value, record) => record.type.includes(value),
      },
      {
        title: "Module",
        dataIndex: "module",
        key: "module",
        // filterMultiple: false,
        ...this.getColumnSearchProps("module"),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        filters: [
          {
            text: "New",
            value: "New",
          },
          {
            text: "Open",
            value: "Open",
          },
          {
            text: "Fixed",
            value: "Fixed",
          },
          {
            text: "Closed",
            value: "Closed",
          },
          {
            text: "Re-open",
            value: "Re-open",
          },
          // {
          //   text: "Postpone",
          //   value: "Postpone",
          // },
        ],
        // filterMultiple: false,
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value),
        render: (value, record) => {
          switch (record.status) {
            case "New":
              return (
                <Tag
                  style={{
                    opacity: "75%",
                    width: 60,
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "#f5f5f5",
                  }}
                  color="#595959"
                >
                  New
                </Tag>
              );
            case "Open":
              return (
                <Tag
                  style={{
                    opacity: "75%",
                    width: 60,
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "#f5f5f5",
                  }}
                  color="#2f54eb"
                >
                  Open
                </Tag>
              );
            case "Fixed":
              return (
                <Tag
                  style={{
                    opacity: "75%",
                    width: 60,
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "#f5f5f5",
                  }}
                  color="#52c41a"
                >
                  Fixed
                </Tag>
              );
            case "Closed":
              return (
                <Tag
                  style={{
                    opacity: "75%",
                    width: 60,
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "#f5f5f5",
                  }}
                  color="#3f6600"
                >
                  Closed
                </Tag>
              );
            case "Re-open":
              return (
                <Tag
                  style={{
                    opacity: "75%",
                    width: 60,
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "#f5f5f5",
                  }}
                  color="#f5222d"
                >
                  Re-open
                </Tag>
              );
            case "Postpone":
              return (
                <Tag
                  style={{
                    opacity: "75%",
                    width: 60,
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "#f5f5f5",
                  }}
                  color="#874d00"
                >
                  Postpone
                </Tag>
              );
            case "Reject":
              return (
                <Tag
                  style={{
                    opacity: "75%",
                    width: 60,
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "#f5f5f5",
                  }}
                  color="#722ed1"
                >
                  Reject
                </Tag>
              );
          }
        },
      },
      {
        title: "Severity",
        dataIndex: "severity",
        key: "severity",
        filters: [
          {
            text: "High",
            value: "High",
          },
          {
            text: "Medium",
            value: "Medium",
          },
          {
            text: "Low",
            value: "Low",
          },
        ],
        // filterMultiple: false,
        filteredValue: filteredInfo.severity || null,
        onFilter: (value, record) => record.severity.includes(value),
        render: (value, record) => {
          switch (record.severity) {
            case "High":
              return (
                <Tag
                  style={{
                    opacity: "75%",
                    width: 60,
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "#f5f5f5",
                  }}
                  color="#ad2102"
                >
                  High
                </Tag>
              );
            case "Medium":
              return (
                <Tag
                  style={{
                    opacity: "75%",
                    width: 60,
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "#f5f5f5",
                  }}
                  color="#fa8c16"
                >
                  Medium
                </Tag>
              );
            case "Low":
              return (
                <Tag
                  style={{
                    opacity: "75%",
                    width: 60,
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "#f5f5f5",
                  }}
                  color="#237804"
                >
                  Low
                </Tag>
              );
          }
        },
      },
      {
        title: "Priority",
        dataIndex: "priority",
        key: "priority",
        filters: [
          {
            text: "High",
            value: "High",
          },
          {
            text: "Medium",
            value: "Medium",
          },
          {
            text: "Low",
            value: "Low",
          },
        ],
        // filterMultiple: false,
        filteredValue: filteredInfo.priority || null,
        onFilter: (value, record) => record.priority.includes(value),
        render: (value, record) => {
          switch (record.priority) {
            case "High":
              return (
                <Tag
                  style={{
                    opacity: "75%",
                    width: 60,
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "#f5f5f5",
                  }}
                  color="#ad2102"
                >
                  High
                </Tag>
              );
            case "Medium":
              return (
                <Tag
                  style={{
                    opacity: "75%",
                    width: 60,
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "#f5f5f5",
                  }}
                  color="#fa8c16"
                >
                  Medium
                </Tag>
              );
            case "Low":
              return (
                <Tag
                  style={{
                    opacity: "75%",
                    width: 60,
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "#f5f5f5",
                  }}
                  color="#237804"
                >
                  Low
                </Tag>
              );
          }
        },
      },
      {
        title: "Entered By",
        dataIndex: "enteredBy",
        key: "enteredBy",
        ...this.getColumnSearchProps("enteredBy"),
      },
      {
        title: "Assign To",
        dataIndex: "assignTo",
        key: "assignTo",
        ...this.getColumnSearchProps("assignTo"),
      },
      {
        title: "Action",
        key: "edit",
        render: (record = this.state.selectedRows) => (
          <a
            style={{ textAlign: "center" }}
            onClick={() => this.onViewViewform(record)}
          >
            View
          </a>
        ),
      },
    ];
    return (
      <Fragment>
        <Row gutter={8}>
          <Col span={6}>
            <Button
              type="primary"
              style={{
                marginBottom: 16,
                marginTop: 10,
                width: 100,
                marginLeft: 40,
              }}
              onClick={this.props.viewDefectAddDrawerForm}
            >
              Add Defect
            </Button>
            &nbsp; &nbsp; &nbsp;
            <Button
              type="primary"
              danger
              onClick={this.clearFilters}
              style={{
                marginBottom: 16,
                marginTop: 10,
                width: 100,
              }}
            >
              Reset Table
            </Button>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <div className="serverity-box">
              <Row gutter={16}>
                <Col span={6}>
                  <div className="sev-box">
                    <div className="sev-name">
                      <Text
                        style={{
                          fontWeight: "500",
                          color: "black",
                          fontStyle: "italic",
                          fontSize: 15,
                        }}
                        type="secondary"
                      >
                        RE-OPEN DEFECTS : {this.state.ropendef}
                      </Text>
                      <br />
                    </div>
                    <div className="total-sev">
                      <span className="avatar-item">
                        <Badge
                          count={this.state.ropenHigh}
                          style={{
                            backgroundColor: "red",
                          }}
                        >
                          <Avatar
                            style={{ color: "red", fontWeight: "bolder" }}
                            shape="circle"
                            icon="H"

                          />
                        </Badge>
                      </span>
                      <span className="avatar-item">
                        <Badge
                          count={this.state.ropenMedium}
                          style={{ backgroundColor: "#faad14" }}
                        >
                          <Avatar
                            style={{ color: "#faad14", fontWeight: "bolder" }}
                            shape="circle"
                            icon="M"
                          />
                        </Badge>
                      </span>
                      <span className="avatar-item">
                        <Badge
                          count={this.state.ropenLow}
                          style={{ backgroundColor: "#237804" }}
                        >
                          <Avatar
                            style={{ color: "green", fontWeight: "bolder" }}
                            shape="circle"
                            icon="L"
                          />
                        </Badge>
                      </span>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="sev-box">
                    <div className="sev-name">
                      <Text
                        style={{
                          fontWeight: "500",
                          color: "black",
                          fontStyle: "italic",
                          fontSize: 15,
                        }}
                        type="secondary"
                      >
                        OPEN DEFECTS : {this.state.opendef}
                      </Text>
                      <br />
                    </div>
                    <div className="total-sev">
                      <span className="avatar-item">
                        <Badge
                          count={this.state.openHigh}
                          style={{ backgroundColor: "red" }}
                        >
                          <Avatar
                            style={{ color: "red", fontWeight: "bolder" }}
                            shape="circle"
                            icon="H"
                          />
                        </Badge>
                      </span>
                      <span className="avatar-item">
                        <Badge
                          count={this.state.openMedium}
                          style={{ backgroundColor: "#faad14" }}
                        >
                          <Avatar
                            style={{ color: "#faad14", fontWeight: "bolder" }}
                            shape="circle"
                            icon="M"
                          />
                        </Badge>
                      </span>
                      <span className="avatar-item">
                        <Badge
                          count={this.state.openLow}
                          style={{ backgroundColor: "#237804" }}
                        >
                          <Avatar
                            style={{ color: "green", fontWeight: "bolder" }}
                            shape="circle"
                            icon="L"
                          />
                        </Badge>
                      </span>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="sev-box">
                    <div className="sev-name">
                      <Text
                        style={{
                          fontWeight: "500",
                          color: "black",
                          fontStyle: "italic",
                          fontSize: 15,
                        }}
                        type="secondary"
                      >
                        NEW DEFECTS : {this.state.newdef}
                      </Text>
                      <br />
                    </div>
                    <div className="total-sev">
                      <span className="avatar-item">
                        <Badge
                          count={this.state.newHigh}
                          style={{ backgroundColor: "red" }}
                        >
                          <Avatar
                            style={{ color: "red", fontWeight: "bolder" }}
                            shape="circle"
                            icon="H"
                          />
                        </Badge>
                      </span>
                      <span className="avatar-item">
                        <Badge
                          count={this.state.newMedium}
                          style={{ backgroundColor: "#faad14" }}
                        >
                          <Avatar
                            style={{ color: "#faad14", fontWeight: "bolder" }}
                            shape="circle"
                            icon="M"
                          />
                        </Badge>
                      </span>
                      <span className="avatar-item">
                        <Badge
                          count={this.state.newLow}
                          style={{ backgroundColor: "#237804" }}
                        >
                          <Avatar
                            style={{ color: "green", fontWeight: "bolder" }}
                            shape="circle"
                            icon="L"
                          />
                        </Badge>
                      </span>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="sev-box">
                    <div className="sev-name">
                      <Text
                        style={{
                          fontWeight: "500",
                          color: "black",
                          fontStyle: "italic",
                          fontSize: 15,
                        }}
                        type="secondary"
                      >
                        TOTAL DEFECTS : {this.state.data.length}
                      </Text>
                    </div>
                    <div className="total-sev">
                      <span className="avatar-item">
                        <Badge
                          count={this.state.high}
                          style={{ backgroundColor: "red" }}
                        >
                          <Avatar
                            style={{ color: "red", fontWeight: "bolder" }}
                            shape="circle"
                            icon="H"
                          />
                        </Badge>
                      </span>
                      <span className="avatar-item">
                        <Badge
                          count={this.state.medium}
                          style={{ backgroundColor: "#faad14" }}
                        >
                          <Avatar
                            style={{ color: "#faad14", fontWeight: "bolder" }}
                            shape="circle"
                            icon="M"
                          />
                        </Badge>
                      </span>
                      <span className="avatar-item">
                        <Badge
                          count={this.state.low}
                          style={{ backgroundColor: "#237804" }}
                        >
                          <Avatar
                            style={{ color: "green", fontWeight: "bolder" }}
                            shape="circle"
                            icon="L"
                          />
                        </Badge>
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <br></br>
        <Table
          locale={locale}
          columns={columns}
          dataSource={this.state.data}
          onChange={this.filterHandleChange}
        />
        <Drawer
          title="View Defect Details"
          width={720}
          onClose={this.onCloseViewForm}
          visible={this.state.viewFormVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: "right",
              }}
            >
              <Button onClick={this.onCloseViewForm} style={{ marginRight: 8 }}>
                Cancel
              </Button>

              <Button
                type="primary"
                onClick={() => this.onViewUpdateForm(this.state.record)}              >
                Edit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item>
                  <Text mark style={{ float: "left", fontSize: "16px" }}>
                    {" "}
                    Defects ID: {this.state.record.defectsId}{" "}
                  </Text>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Defect Description"
                  style={{
                    fontWeight: "bolder",
                    backgroundColor: "#f0f0f0",
                    padding: 10,
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontWeight: "normal" }}>
                    {this.state.record.defectsName}
                  </Text>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Steps To Recreate"
                  style={{
                    fontWeight: "bolder",
                    backgroundColor: "#f0f0f0",
                    padding: 5,
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontWeight: "normal" }}>
                    {this.state.record.stepToRecreate}
                  </Text>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Type"
                  style={{
                    fontWeight: "bolder",
                    backgroundColor: "#f0f0f0",
                    padding: 10,
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontWeight: "normal" }}> {this.state.record.type}</Text>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Status"
                  style={{
                    fontWeight: "bolder",
                    backgroundColor: "#f0f0f0",
                    padding: 10,
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontWeight: "normal" }}>{this.state.record.status}</Text>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Serverity"
                  style={{
                    fontWeight: "bolder",
                    backgroundColor: "#f0f0f0",
                    padding: 10,
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontWeight: "normal" }}>
                    {this.state.record.severity}
                  </Text>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Priority"
                  style={{
                    fontWeight: "bolder",
                    backgroundColor: "#f0f0f0",
                    padding: 10,
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontWeight: "normal" }}> {this.state.record.priority}</Text>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Entered By"
                  style={{
                    fontWeight: "bolder",
                    backgroundColor: "#f0f0f0",
                    padding: 10,
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontWeight: "normal" }}>{this.state.record.enteredBy}</Text>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="AssignTo"
                  style={{
                    fontWeight: "bolder",
                    backgroundColor: "#f0f0f0",
                    padding: 10,
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontWeight: "normal" }}>{this.state.record.assignTo}</Text>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Found In"
                  style={{
                    fontWeight: "bolder",
                    backgroundColor: "#f0f0f0",
                    padding: 10,
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontWeight: "normal" }}>{this.state.record.foundIn}</Text>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Available In"
                  style={{
                    fontWeight: "bolder",
                    backgroundColor: "#f0f0f0",
                    padding: 10,
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontWeight: "normal" }}>
                    {this.state.record.availableIn}
                  </Text>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Module"
                  style={{
                    fontWeight: "bolder",
                    backgroundColor: "#f0f0f0",
                    padding: 10,
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontWeight: "normal" }}>{this.state.record.module}</Text>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="SubModule"
                  style={{
                    fontWeight: "bolder",
                    backgroundColor: "#f0f0f0",
                    padding: 10,
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontWeight: "normal" }}>{this.state.record.subModule}</Text>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>

        <Drawer
          title="Update Defect Details"
          width={720}
          onClose={this.onCloseUpdateForm}
          visible={this.state.updateformVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: "right",
              }}
            >
              <Button
                style={{ marginRight: 8 }}
                onClick={this.onBack}
              >
                Back
              </Button>
              <Button onClick={(e) => this.handleSubmit(e)} type="primary">
                Update
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item>
                  <Text mark style={{ float: "left", fontSize: "16px" }}>
                    {" "}
                    Defects ID: {this.state.upRecord.defectsId}{" "}
                  </Text>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Defect Description"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    placeholder="Defect Description"
                    name="defectsName"
                    id="defectsName"
                    value={this.state.defectsName}
                    onChange={this.handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Steps To Recreate"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea
                    name="stepToRecreate"
                    rows={4}
                    placeholder="please enter the steps to recreate"
                    value={this.state.stepToRecreate}
                    onChange={(event, field) => this.handleChange(event, field)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Type"
                  rules={[{ required: true, message: "Please select an Type" }]}
                >
                  <Select
                    placeholder="Please select an Type"
                    name="type"
                    value={this.state.type}
                    onChange={(value) => this.handleSelect("type", value)}
                  >
                    <Option value="Functional">Functional</Option>
                    <Option value="Performance">Performance</Option>
                    <Option value="UI">UI</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Status"
                  rules={[{ required: true, message: "Please choose the status" }]}
                >
                  <Select
                    placeholder="Please choose the status"
                    name="status"
                    value={this.state.status}
                    onChange={(value) => this.handleSelect("status", value)}
                  >
                    {(() => {
                      switch (this.state.upRecord.status) {
                        case "New":
                          return (
                            <>
                              <Option value="Open">Open</Option>
                              <Option value="Reject">Reject</Option>
                            </>
                          );
                        case "Closed":
                          return (
                            <>
                              <Option value="Re-open">Re-Open</Option>
                            </>
                          );
                        case "Fixed":
                          return (
                            <>
                              <Option value="Closed">Closed</Option>
                              <Option value="Re-open">Re-Open</Option>
                            </>
                          );
                        case "Re-open":
                          return (
                            <>
                              <Option value="Open">Open</Option>
                              <Option value="Reject">Reject</Option>
                            </>
                          );
                        case "Open":
                          return (
                            <>
                              <Option value="Fixed">Fixed</Option>
                              <Option value="Reject">Reject</Option>
                            </>
                          );
                        case "Reject":
                          return (
                            <>
                              <Option value="Re-open">Re-open</Option>
                            </>
                          );
                      }
                    })()}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Serverity"
                  rules={[{ required: true, message: "Please choose the serverity" }]}
                >
                  <Select
                    placeholder="Please choose the serverity"
                    name="serverity"
                    value={this.state.severity}
                    onChange={(value) => this.handleSelect("severity", value)}
                  >
                    <Option value="High">High</Option>
                    <Option value="Medium">Medium</Option>
                    <Option value="Low">Low</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Priority"
                  rules={[{ required: true, message: "Please choose the priority" }]}
                >
                  <Select
                    placeholder="Please choose the priority"
                    name="priority"
                    value={this.state.priority}
                    onChange={(value) => this.handleSelect("priority", value)}
                  >
                    <Option value="High">High</Option>
                    <Option value="Medium">Medium</Option>
                    <Option value="Low">Low</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Entered By"
                  rules={[
                    { required: true, message: "Please choose the entered by" },
                  ]}
                >
                  <Input
                    value={this.state.enteredBy}
                    disabled
                    style={{ backgroundColor: 'white', color: 'grey' }}
                  >
                  </Input>

                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="AssignTo"
                  rules={[{ required: true, message: "Please choose the assign to" }]}
                >
                  <Select
                    placeholder="Please choose the assign to"
                    name="assignTo"
                    value={this.state.assignTo}
                    onChange={(value) => this.handleSelect("assignTo", value)}
                  >
                    <Option value="Sanjsijan">Sanjsijan</Option>
                    <Option value="Lavanjan">Lavanjan</Option>
                    <Option value="Sivapiriyan">Sivapiriyan</Option>
                    <Option value="Gobika">Gobika</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Found In"
                  rules={[{ required: true, message: "Please choose the found in" }]}
                >
                  <Select
                    placeholder="Please choose the found in"
                    name="foundIn"
                    value={this.state.foundIn}
                    onChange={(value) => this.handleSelect("foundIn", value)}
                  >
                    <Option value="Rel-1">Rel-1</Option>
                    <Option value="Rel-2">Rel-2</Option>
                    <Option value="Rel-3">Rel-3</Option>
                    <Option value="Rel-4">Rel-4</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Available In"
                  rules={[
                    {
                      required: true,
                      message: "Please choose the available in",
                    },
                  ]}
                >
                  <Select
                    placeholder="Please choose the available in"
                    name="availableIn"
                    value={this.state.availableIn}
                    onChange={(value) => this.handleSelect("availableIn", value)}
                  >
                    <Option value="Rel-1">Rel-1</Option>
                    <Option value="Rel-2">Rel-2</Option>
                    <Option value="Rel-3">Rel-3</Option>
                    <Option value="Rel-4">Rel-4</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Module"
                  rules={[{ required: true, message: "Please choose the Module" }]}
                >
                  <Select
                    placeholder="Please choose the module"
                    name="module"
                    value={this.state.module}
                    onChange={(value) => this.handleSelect("module", value)}
                  >
                    <Option value="Module-1">Module-1</Option>
                    <Option value="Module-2">Module-2</Option>
                    <Option value="Module-3">Module-3</Option>
                    <Option value="Module-4">Module-4</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="SubModule"
                  rules={[
                    {
                      required: true,
                      message: "Please choose the Submodule",
                    },
                  ]}
                >
                  <Select
                    placeholder="Please choose the Submodule"
                    name="submodule"
                    value={this.state.subModule}
                    onChange={(value) => this.handleSelect("submodule", value)}
                  >
                    <Option value="SubModule-1">SubModule-1</Option>
                    <Option value="SubModule-2">SubModule-2</Option>
                    <Option value="SubModule-3">SubModule-3</Option>
                    <Option value="SubModule-4">SubModule-4</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
        <AddDefectDetailsForm data={this.state.data} />
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  defect: state.ReducerDefect.defect
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    viewDefectAddDrawerForm: () => { dispatch(viewDefectAddDrawerForm()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDefectDetails);
