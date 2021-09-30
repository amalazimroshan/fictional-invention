import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import Map from "./components/map/Map";
import List from "./components/list/List";
import Navbar from "./components/navbarr/Navbarr";
import { Container, Row, Col } from "react-bootstrap";

const App = () => {
  // const [restaurantList, setRestaurantList] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [propertyList, setPropertyList] = useState([]);

  const REALM_APP_ID = "appllication-01-brmct";
  const app = new Realm.App({ id: REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();

  const getProprtyData = async (values) => {
    // setPropertydata(values);
    try {
      const result = await (
        await app.logIn(credentials)
      ).functions.PostData(values);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };
  // useEffect(() => {
  //   async function sendDataToServer(data) {
  //     try {
  //       // console.log(data);
  //       const result = await(
  //         await app.logIn(credentials)
  //       ).functions.PostData(data);
  //       console.log(result);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   sendDataToServer(propertydata);
  // }, [propertydata]);

  // useEffect(() => {
  //   async function getRestaurantsList() {
  //     try {
  //       const user = await app.logIn(credentials);
  //       const Restaurants = await user.functions.getAllRestaurants();
  //       setRestaurantList(Restaurants);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getRestaurantsList();
  // }, []);

  useEffect(() => {
    async function getProprtyList() {
      try {
        console.log("coordinates changed", bounds);
        const user = await app.logIn(credentials);
        const propertise = await user.functions.getPropertyInsideBounds(bounds);
        setPropertyList(propertise);
        console.log(propertyList);
      } catch (err) {
        console.error(err);
      }
    }
    Object.keys(bounds).length !== 0 && getProprtyList();
  }, [bounds]);

  ////// geting restaurants by name //////
  // useEffect(() => {
  //   async function getRestaurantName() {
  //     try {
  //       const result = await (
  //         await app.logIn(credentials)
  //       ).functions.getRestaurantById("5eb3d668b31de5d588f42948");
  //       console.log(result);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   getRestaurantName();
  // }, []);
  //////////////////////////////////////
  return (
    <Container fluid>
      <Row>
        <Navbar getProprtyData={getProprtyData} />
      </Row>
      <Row style={{ flexDirection: "row-reverse" }}>
        {/* map */}
        <Col lg={8} className="p-0" style={{ background: "hsl(120,40%,80%)" }}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            places={propertyList}
          />
        </Col>
        {/* list */}
        <Col style={{ backgroundColor: "#fff" }}>
          <List propertiseList={propertyList} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
