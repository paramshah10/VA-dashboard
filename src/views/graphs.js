import React, { Component } from 'react';
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar, Pie } from "react-chartjs-2";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
import {
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Row,
    Col,
    Spinner,
  } from "reactstrap";

import {
    chartOptions,
    parseOptions,
} from "variables/charts.js";

import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
  activity_pie as chartExample5,
  step_counts as chartExample6,
} from "variables/charts_data.js"

import { connect } from 'react-redux';

class Graphs extends Component {
    constructor(props){
      super(props);
      this.state = {
        activeNav1: 1,
        activeNav2: 1,
        activeNav3: 1,
        activeNav4: 1,
        activeNav5: 1,
        activeNav6: 1,
        chartExample1Data: "data1",
        chartExample2Data: "data1",
        chartExample3Data: "data1",
        chartExample4Data: "data1",
        chartExample5Data: "data1",
        chartExample6Data: "data1",
      };
      if (window.Chart) {
        parseOptions(Chart, chartOptions());
      }
    }

    toggleNavs = (e, row, col, data) => {
      e.preventDefault();
      if (row === 1) {
        if (col === 1){ //stress
          this.setState({
            activeNav1: data
          });
          if (data === 1){
            this.setState({
              chartExample1Data: "data1"
            });
          }
          else if (data === 2){
            this.setState({
              chartExample1Data: "data2"
            });
          }
          else{
            this.setState({
              chartExample1Data: "data3"
            });
          }
        }
        else{ //sleep
          this.setState({
            activeNav2: data
          });
          if (data === 1){
            this.setState({
              chartExample2Data: "data1"
            });
          }
          else {
            this.setState({
              chartExample2Data: "data2"
            });
          }
        }
      }
      else if (row === 2){
        if (col === 1){
          this.setState({
            activeNav5: data
          });
          if (data === 1){
            this.setState({
              chartExample5Data: "data1"
            });
          }
          else {
            this.setState({
              chartExample5Data: "data2"
            });
          }
        }
        else {
          this.setState({
            activeNav6: data
          });
          if (data === 1){
            this.setState({
              chartExample6Data: "data1"
            });
          }
          else {
            this.setState({
              chartExample6Data: "data2"
            });
          }
        }
      }
      else if (row === 3){
        if (col === 1){
          this.setState({
            activeNav3: data
          });
          if (data === 1){
            this.setState({
              chartExample3Data: "data1"
            });
          }
          else {
            this.setState({
              chartExample3Data: "data2"
            });
          }
        }
        else {
          this.setState({
            activeNav4: data
          });
          if (data === 1){
            this.setState({
              chartExample4Data: "data1"
            });
          }
          else {
            this.setState({
              chartExample4Data: "data2"
            });
          }
        }
      }
    };

    render() {
      return (
        <>
          { !this.props.fetchedInitial &&
            <div className="loading-spinner">
              <Spinner style={{width: '5rem', height: '5rem'}} color="primary" size='lg'/>
            </div>
          }
          <Row>

              <Col xl="4">
              <Card className="shadow">
                  <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                      <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                          Overview
                      </h6>
                      <h2 className="mb-0">Sleep (hours)</h2>
                      </div>
                      <div>
                      <Nav className="justify-content-end" pills>
                          <NavItem>
                          <NavLink
                              className={classnames("py-2 px-3", {
                              active: this.state.activeNav2 === 1
                              })}
                              href="#pablo"
                              onClick={e => this.toggleNavs(e, 1, 2, 1)}
                              >
                              <span className="d-none d-md-block">Week</span>
                              <span className="d-md-none">W</span>
                          </NavLink>
                          </NavItem>
                          <NavItem>
                          <NavLink
                              className={classnames("py-2 px-3", {
                              active: this.state.activeNav2 === 2
                              })}
                              href="#pablo"
                              onClick={e => this.toggleNavs(e, 1, 2, 2)}
                              >
                              <span className="d-none d-md-block">Month</span>
                              <span className="d-md-none">M</span>
                          </NavLink>
                          </NavItem>
                      </Nav>
                      </div>
                  </Row>
                  </CardHeader>
                  <CardBody>
                  {/* Chart */}
                  <div className="chart">
                      <Bar
                      data={chartExample2[this.state.chartExample2Data]}
                      options={chartExample2.options}
                      getDatasetAtEvent={e => console.log(e)}
                      />
                  </div>
                  </CardBody>
              </Card>
              </Col>
          </Row>
          {/*Second Row */}
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="6">
              <Card className="shadow">
              <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="mb-0">Activity Breakdown</h2>
                    </div>
                    <div className="col">
                    <Nav className="justify-content-end" pills>
                        <NavItem>
                        <NavLink
                            className={classnames("py-2 px-3", {
                            active: this.state.activeNav5 === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2, 1, 1)}
                            // onClick={e => e.preventDefault()}
                            >
                            <span className="d-none d-md-block">Day</span>
                            <span className="d-md-none">D</span>
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                            className={classnames("py-2 px-3", {
                            active: this.state.activeNav5 === 2
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2, 1, 2)}
                            // onClick={e => e.preventDefault()}
                            >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                        </NavLink>
                        </NavItem>
                    </Nav>
                    </div>
                  </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                    <Pie
                    data={chartExample5[this.state.chartExample5Data]}
                    options={chartExample5.options}
                    getDatasetAtEvent={e => console.log(e)}
                    />
                </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-5 mb-xl-0" xl="6">
              <Card className="shadow">
              <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="mb-0">Step Counts</h2>
                    </div>
                    <div className="col">
                    <Nav className="justify-content-end" pills>
                        <NavItem>
                        <NavLink
                            className={classnames("py-2 px-3", {
                            active: this.state.activeNav6 === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2, 2, 1)}
                            // onClick={e => e.preventDefault()}
                            >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                            className={classnames("py-2 px-3", {
                            active: this.state.activeNav6 === 2
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2, 2, 2)}
                            // onClick={e => e.preventDefault()}
                            >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                        </NavLink>
                        </NavItem>
                    </Nav>
                    </div>
                  </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                    <Bar
                    data={chartExample6[this.state.chartExample6Data]}
                    options={chartExample6.options}
                    getDatasetAtEvent={e => console.log(e)}
                    />
                </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/*Third Row */}
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="6">
              <Card className="shadow">
              <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="mb-0">Social Activities</h2>
                    </div>
                    <div className="col">
                    <Nav className="justify-content-end" pills>
                        <NavItem>
                        <NavLink
                            className={classnames("py-2 px-3", {
                            active: this.state.activeNav3 === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 3, 1, 1)}
                            // onClick={e => e.preventDefault()}
                            >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                            className={classnames("py-2 px-3", {
                            active: this.state.activeNav3 === 2
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 3, 1, 2)}
                            // onClick={e => e.preventDefault()}
                            >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                        </NavLink>
                        </NavItem>
                    </Nav>
                    </div>
                  </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                    <Pie
                    data={chartExample3[this.state.chartExample3Data]}
                    options={chartExample3.options}
                    getDatasetAtEvent={e => console.log(e)}
                    />
                </div>
                </CardBody>
              </Card>
            </Col>

          </Row>
        </>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    fetchedInitial: state.charts.fetchedChartsData,
  }
}

export default connect(
  mapStateToProps,
)(Graphs)