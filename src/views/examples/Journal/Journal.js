import React from 'react';
import {
    Container,
    Card,
    CardHeader,
    Button,
    ListGroupItem,
    ListGroup,
    Row,
    Col,
    Nav,
    NavItem
} from 'reactstrap'

//redux
import { connect } from 'react-redux';
import { receiveEntries } from 'lib/redux/actions/journal';
import { removeEntry } from 'lib/redux/actions/journal';

const firebase = require("firebase/app");
require("firebase/firestore");

class Journal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showED: {}
        }
      }

    db = firebase.firestore();
    uid = localStorage.getItem("uid")

    componentDidMount() {
        if (!this.props.fetchedInitial){        
            let docRef = this.db.collection("users").doc(this.uid).collection("journal").orderBy('id')
            docRef.get().then((doc) => {
                var data = doc.docs.map(doc => doc.data())
                this.props.receiveEntries(data, data.length)
                this.setState({
                    fetchedInitial: true
                })
            })
            .catch((error) => {
                console.log("Couldn't fetch journal entries. Error: ", error)
            })
        }
    }

    onEntryDelete(id) {
        let docRef = this.db.collection("users").doc(this.uid).collection("journal").where("id", "==", id)
        docRef.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                doc.ref.delete()
            })
            this.props.removeEntry(id)
            this.forceUpdate()
        })
        .catch((error) => {
            console.log("Could not delete the entry! ERROR:", error);
        })
    }

    onEntryEdit() {
        console.log("Edited")
    }

    render() {
      return(
        <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"/>
        <Container className="mt--7" fluid>
            <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                    <Col xs="8">
                        <h3 className="mb-0">Recent Notes</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                        <Nav className="justify-content-end" pills>
                            <NavItem className="py-3 px-3">
                            <h5 className="mb-0">Sort by:</h5>
                            </NavItem>
                            <NavItem className="py-2 px-3">
                            <Button
                                color="primary"
                                onClick={e => {e.preventDefault();  this.forceUpdate()}}
                                size="sm"
                            >
                                Date Created
                            </Button>
                            </NavItem>
                            <NavItem className="py-2 px-3">
                            <Button
                                color="primary"
                                onClick={e => e.preventDefault()}
                                size="sm"
                            >
                                Date Edited
                            </Button>
                            </NavItem>
                        </Nav>
                    </Col>
                    </Row>
                </CardHeader>
                <ListGroup flush>
                    {/* Add hover over feature to display an edit and delete button */}
                    { this.props.entries.length != 0 && this.props.entries.map(entry =>
                    <ListGroupItem
                    className="list-group-item-action flex-column align-items-start py-4 px-4"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    onMouseEnter={() => {this.state.showED[entry.id] = true; this.forceUpdate()}}
                    onMouseLeave={() => {this.state.showED[entry.id] = false; this.forceUpdate()}}
                    >
                        <div className="d-flex w-100 justify-content-between">
                        <div>
                            <div className="d-flex w-100 align-items-center">
                            <img
                                alt="..."
                                className="avatar avatar-xs mr-2"
                                src={require("assets/img/theme/journal.png")}
                            />
                            <h4 className="mb-1">{entry.subject}</h4>
                            </div>
                        </div>
                        <small>Last Edited {entry.date_edited}</small>
                        </div>
                        <Row>
                            <Col xs="11">
                                <h6 className="mt-4 mb-2">Created {entry.date_created} </h6>
                                <p className="text-sm mb-0">{entry.content}</p>
                            </Col>
                        {
                            this.state.showED[entry.id] &&
                            <Col xs="1">
                                <Button className="col mt-4 d-none d-md-block" style={{bottom: 5}} color="default" size="sm" onClick={() => this.onEntryEdit()}>Edit</Button>
                                <Button className="col mt-4 d-md-none" style={{bottom: 2}} color="default" size="sm" onClick={() => this.onEntryEdit()}>E</Button>

                                <Button className="col mt-1 d-none d-md-block" style={{bottom: 0}} color="default" size="sm" onClick={() => this.onEntryDelete(entry.id)}>Delete</Button>
                                <Button className="col mt-1 d-md-none" style={{bottom: 0}} color="default" size="sm" onClick={() => this.onEntryDelete(entry.id)}>D</Button>
                            </Col>
                        }
                        </Row>
                    </ListGroupItem>
                    )}

                    {this.props.entries.length == 0 &&
                    <ListGroupItem
                        className="list-group-item-action flex-column align-items-start py-4 px-4"
                    >
                        <p className="text-md mb-0">Notes created will be displayed here!</p>
                    </ListGroupItem>
                    }
                </ListGroup>
            </Card>
        </Container>
        </>
      )
  }
}
const mapStateToProps = (state) => {
    return {
      entries: state.journal.entries,
      fetchedInitial: state.journal.fetchedInitial,
      num_entries: state.journal.num_entries
    }
}

const mapDispatchToProps = dispatch => {
    return {
        receiveEntries: (entries, num_entries) => dispatch(receiveEntries(entries, num_entries)),
        removeEntry: (id) => dispatch(removeEntry(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Journal)


// export default Journal;