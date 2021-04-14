import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import {
  Link
} from 'react-scroll'

import {connect} from 'react-redux'

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Link to="steps_graph" offset={-10} duration={750} smooth={true}>
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Steps Taken
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {this.props.overalls["step_counts"] && this.props.overalls["step_counts"]["score"]}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i className="fas fa-chart-bar" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          {this.props.overalls["step_counts"] && this.props.overalls["step_counts"]["value_change"] === "up" ?
                            (<span className="text-danger mr-2">
                              <i className="fa fa-arrow-up" /> {this.props.overalls["step_counts"]["percent_change"]}%
                            </span>)
                            :
                            (<span className="text-danger mr-2">
                              <i className="fa fa-arrow-down" /> {this.props.overalls["step_counts"] && this.props.overalls["step_counts"]["percent_change"]}%
                            </span>)
                            }{" "}
                          <span className="text-nowrap">Last seven days</span>
                        </p>
                      </CardBody>
                      </Card>
                    </Link>
                </Col>
                <Col lg="6" xl="3">
                  <Link to="sleep_graph" offset={-10} duration={750} smooth={true}>
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Sleep
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {this.props.overalls["sleep"] && this.props.overalls["sleep"]["score"] } hours/night
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                              <i className="fas fa-chart-pie" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          {this.props.overalls["sleep"] && this.props.overalls["sleep"]["value_change"] === "up" ?
                            (<span className="text-success mr-2">
                              <i className="fa fa-arrow-up" /> {this.props.overalls["sleep"]["percent_change"]}%
                            </span>)
                            :
                            (<span className="text-danger mr-2">
                              <i className="fa fa-arrow-down" /> {this.props.overalls["sleep"] && this.props.overalls["sleep"]["percent_change"]}%
                            </span>)
                            }{" "}
                          <span className="text-nowrap">Last seven days</span>
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>
                <Col lg="6" xl="3">
                  <Link to="social_graph" offset={-10} duration={750} smooth={true}>
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Social Activity
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {this.props.overalls["stress_management"] && this.props.overalls["stress_management"]["score"]} mins/day
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                              <i className="fas fa-users" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          {this.props.overalls["stress_management"] && this.props.overalls["stress_management"]["value_change"] === "up" ?
                            (<span className="text-success mr-2">
                              <i className="fa fa-arrow-up" /> {this.props.overalls["stress_management"]["percent_change"]}%
                            </span>)
                            :
                            (<span className="text-danger mr-2">
                              <i className="fa fa-arrow-down" /> {this.props.overalls["stress_management"] && this.props.overalls["stress_management"]["percent_change"]}%
                            </span>)
                            }{" "}
                          <span className="text-nowrap">Last seven days</span>
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>
                {/* <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            High-Stress Events
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.overalls["stress_events"] && this.props.overalls["stress_events"]["score"]}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        {this.props.overalls["stress_events"] && this.props.overalls["stress_events"]["value_change"] === "up" ?
                          (<span className="text-danger mr-2">
                            <i className="fa fa-arrow-up" /> {this.props.overalls["stress_events"]["percent_change"]}%
                          </span>)
                          :
                          (<span className="text-success mr-2">
                            <i className="fa fa-arrow-down" /> {this.props.overalls["stress_events"] && this.props.overalls["stress_events"]["percent_change"]}%
                          </span>)
                          }{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col> */}
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetchedInitial: state.charts.fetchedChartsData,
    overalls: state.charts.overalls
  }
}

export default connect(
  mapStateToProps,
)(Header)