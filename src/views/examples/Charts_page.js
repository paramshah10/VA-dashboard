import React from 'react';
import Graphs from '../graphs.js';
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import classnames from "classnames";

import {
    chartOptions,
    parseOptions,
} from "variables/charts.js";

import {
    chartExample5 as chartExample1,
    chartExample6 as chartExample2,
    chartExample7 as chartExample3,
    chartExample8 as chartExample4,
} from "variables/charts_data.js"

import {
    Row,
    Col,
    Container,
    NavItem,
    NavLink,
    Nav,
    Card,
    CardHeader,
    CardBody,
    // Spinner
} from 'reactstrap'

import { connect } from 'react-redux';

class Charts extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        activeNav1: 1,
        activeNav2: 1,
        activeNav3: 1,
        activeNav4: 1,
        chartExample1Data: "data1",
        chartExample2Data: "data1",
        chartExample3Data: "data1",
        chartExample4Data: "data1",
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
          else{
            this.setState({
              chartExample1Data: "data2"
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
      else{
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
      return(
        <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"/>
        <Container className="mt--7" fluid>
            <Row>
                <Col className="mb-5 mb-xl-0" xl="7">
                <Card className="bg-gradient-default shadow">
                    <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                        <div className="col">
                        <h6 className="text-uppercase text-light ls-1 mb-1">
                            Overview
                        </h6>
                        <h2 className="text-white mb-0">Sleep</h2>
                        </div>
                        <div className="col">
                        <Nav className="justify-content-end" pills>
                            <NavItem>
                            <NavLink
                                className={classnames("py-2 px-3", {
                                active: this.state.activeNav1 === 1
                                })}
                                data-toggle="tab"
                                href="#pablo"
                                onClick={e => this.toggleNavs(e, 1, 1, 1)}
                            >
                                <span className="d-none d-md-block">Week</span>
                                <span className="d-md-none">W</span>
                            </NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink
                                className={classnames("py-2 px-3", {
                                active: this.state.activeNav1 === 2
                                })}
                                href="#pablo"
                                onClick={e => this.toggleNavs(e, 1, 1, 2)}
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
                        <Line
                        data={chartExample1[this.state.chartExample1Data]}
                        options={chartExample1.options}
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
                    <h2 className="mb-0">Stress Breakdown (by score ORANGES)</h2>
                    </div>
                    <div className="col">
                    <Nav className="justify-content-end" pills>
                        <NavItem>
                        <NavLink
                            className={classnames("py-2 px-3", {
                            active: this.state.activeNav3 === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2, 1, 1)}
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
                            onClick={e => this.toggleNavs(e, 2, 1, 2)}
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
                    data={chartExample3[this.state.chartExample3Data]}
                    options={chartExample3.options}
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
                    <h2 className="mb-0">Stress Breakdown (by type)</h2>
                    </div>
                    <div className="col">
                    <Nav className="justify-content-end" pills>
                        <NavItem>
                        <NavLink
                            className={classnames("py-2 px-3", {
                            active: this.state.activeNav4 === 1
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
                            active: this.state.activeNav4 === 2
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
                    data={chartExample4[this.state.chartExample4Data]}
                    options={chartExample4.options}
                    getDatasetAtEvent={e => console.log(e)}
                    />
                </div>
                </CardBody>
                </Card>
            </Col>
            </Row>

        </Container>
        <Container className="mt-5" fluid>
            <Graphs/>
        </Container>
        </>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    fetchedInitial: state.charts.fetchedChartsData,
  }
}

export default connect(
  mapStateToProps,
)(Charts)