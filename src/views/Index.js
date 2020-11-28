import React from "react";

import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import Graphs from "./graphs.js"

import { connect } from 'react-redux';
import { addUserData } from 'lib/redux/actions/app';

const firebase = require("firebase/app");
require("firebase/firestore");

class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stressIncidents: [],
      dateSort: true,
      stressSort: true,
      showTextBox: Array(6).fill(false),
    }
  }

  componentDidMount() {
    const uid = localStorage.getItem("uid")
    let db = firebase.firestore();

    //when writing code to update data (description data) from website, no need to update the component manually. the below code will make the component update
    let docRef = db.collection("users").doc(uid).collection("stress_incidents").orderBy("index")
    docRef.onSnapshot((doc) => {
      var data = doc.docs.map(d => d.data())
      this.setState({
        stressIncidents: data,
      })
    })

    db.collection("users").doc(uid).get()
    .then((doc) => {
      this.props.addUserData(doc.data())
    })
  }

  onDateToggle(e){
    e.preventDefault();
    let sort = !this.state.dateSort;
    this.setState({
      dateSort: !this.state.dateSort,
      stressIncidents: sort ?
        this.state.stressIncidents.sort(function (a, b) {
          a = a.date.split('/');
          b = b.date.split('/');
          return b[2] - a[2] || b[0] - a[0] || b[1] - a[1];
        }) : this.state.stressIncidents.sort(function (a, b) {
          a = a.date.split('/');
          b = b.date.split('/');
          return a[2] - b[2] || a[0] - b[0] || a[1] - b[1];
        })
    });
  }

  onStressToggle(e){
    e.preventDefault();
    let sort = !this.state.stressSort;
    this.setState({
      stressSort: !this.state.stressSort,
      stressIncidents: sort ? 
        this.state.stressIncidents.sort((a,b) => b.stress_score - a.stress_score) : this.state.stressIncidents.sort((a,b) => a.stress_score - b.stress_score),
    });
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Graphs />
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Recent High Stress Incidents</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"><Button>Reason</Button></th>
                      <th scopr="col"><Button onClick={e => this.onStressToggle(e)}>Stress Score</Button></th>
                      <th scope="col"><Button onClick={e => this.onDateToggle(e)}>Date</Button></th>
                      <th scope="col"><Button>Time</Button></th>
                      <th scope="col"><Button>Description</Button></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.stressIncidents.map(incident => 
                      <tr>
                        <td key={String(incident.index)+String(incident.index)}>
                          <Input 
                            type="select" 
                            defaultValue={incident.reason}
                            onChange={(e) => console.log(`stress reason changed to ${e.target.value}`)}
                          >
                            <option>Work</option>
                            <option>Social</option>
                            <option>Money</option>
                            <option>Family</option>
                            <option>Other</option>
                          </Input>
                        </td>
                        <td>{incident.stress}</td>
                        <td>{incident.date}</td>
                        <td>{incident.time}</td>
                        <td key={incident.index}>
                          <Input type="textarea"
                            defaultValue={`${incident.description} on ${incident.date}`}
                            id={'Box'+incident.index}
                            plaintext={!this.state.showTextBox[incident.index]}
                            onDoubleClick={(e) => {
                              e.preventDefault();
                              this.state.showTextBox[incident.index] = true; 
                              this.forceUpdate();
                            }}
                          />
                          <UncontrolledTooltip delay={0} placement='right' trigger="hover focus" target={'Box'+incident.index}>
                            Double Click Me to Edit!
                          </UncontrolledTooltip>                          
                          {
                            this.state.showTextBox[incident.index] && 
                            <Button
                              color='default'
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                this.state.showTextBox[incident.index] = false;
                                this.forceUpdate();
                              }}
                            >Save</Button>
                          }
                        </td>
                      </tr>
                      )}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      addUserData: (userData) => dispatch(addUserData(userData)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Index);
