import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Chart from "react-google-charts";
import Row from "react-bootstrap/Row";
import LoadingBox from "../components/LoadingBox/LoadingBox";
import MessageBox from "../components/MessageBox/MessageBox";
import { Store } from "../Store";
import { getError } from "../Utils";

//Define reducer to fetch data from backend
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        summary: action.payload, //when fetch succeed, we fill summary field with data retrieve from backend inside action.payload
        loading: false, //set loading to false to remove loading message
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function DashboardScreen() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  //we pull userInfo from global state because we need it to authenticate the route
  const { state } = useContext(Store);
  const { userInfo } = state;

  //we use useEffect to send AJAX request
  useEffect(() => {
    const fetchData = async () => {
      try {
        //send ajax request
        const { data } = await axios.get("/api/orders/summary", {
          headers: { Authorization: `Bearer ${userInfo.token}` }, //to authenticate this api request
        });
        //We dispatch action when fetch success and set payload with the data retrieve from the backend api
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    //CALL FN TO MAKE IT RUN
    fetchData();
  }, [userInfo]);

  return (
    <div>
      <h1>Dashboard</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.users && // if summary.users exst
                    summary.users[0] // then, if first element exist
                      ? summary.users[0]
                          .numUsers /**this data is set in backend side */
                      : 0}
                  </Card.Title>
                  <Card.Text>Users</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.orders && // if summary.users exst
                    summary.orders[0] // then, if first element exist
                      ? summary.orders[0]
                          .numOrders /**this data is set in backend side */
                      : 0}
                  </Card.Title>
                  <Card.Text>Orders</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    $
                    {summary.orders && // if summary.users exst
                    summary.orders[0] // then, if first element exist
                      ? summary.orders[0].totalSales.toFixed(
                          2
                        ) /**this data is set in backend side and we want it with two digits */
                      : 0}
                  </Card.Title>
                  <Card.Text>Orders</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="my-3">
            <h2>Sales</h2>
            {summary.dailyOrders.length === 0 ? (
              <MessageBox>No Sale</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="AreaChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ["Date", "Sales"], //array of axis
                  ...summary.dailyOrders.map((x) => [x._id, x.sales]), //the data to show is dailyOrders retrieve from backend
                ]}
              ></Chart>
            )}
          </div>
          <div className="my-3">
            <h2>Categories</h2>
            {summary.productCategories.length === 0 ? (
              <MessageBox>No Category</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ["Category", "Products"], //array of axis
                  ...summary.productCategories.map((x) => [x._id, x.count]), //the data to show is in productCategories array retrieve from backend with _id and count.
                ]}
              ></Chart>
            )}
          </div>
        </>
      )}
    </div>
  );
}
