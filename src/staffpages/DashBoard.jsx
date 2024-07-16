import React, { useEffect, useState } from "react";
import { Card, Row, Col, Breadcrumb, Button } from "antd";
import { CalendarOutlined, MoreOutlined } from "@ant-design/icons";
import { CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";

const Dashboard = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderStatistics = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
          "http://localhost:5000/api/orders/statistics",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch order statistics");
        }
        const data = await response.json();
        setCardData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch order statistics", error);
        setLoading(false);
      }
    };

    fetchOrderStatistics();
  }, []);

  const lineChartConfig = {
    type: "line",
    height: 240,
    series: [
      {
        name: "Sales",
        data: [50, 40, 300, 320, 500, 350, 200],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  const pieChartConfig = {
    type: "pie",
    width: 280,
    height: 280,
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      legend: {
        show: false,
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 mx-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Row gutter={16}>
        {cardData.map((card, index) => (
          <Col key={index} xs={24} sm={12} md={6}>
            <Card className="shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <Button className="border-white h-fit">
                  <MoreOutlined />
                </Button>
              </div>
              <div className="flex items-center mb-2">
                <div className="bg-orange-500 text-white p-4 rounded-lg mr-2">
                  <CalendarOutlined />
                </div>
                <div>
                  <p className="text-xl font-bold">{card.amount}</p>
                  <p className="text-green-500">{card.percentage}</p>
                </div>
              </div>
              <p className="text-gray-500">{card.compared}</p>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="flex mt-5 space-x-9">
        <Card className="w-3/4">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div>
              <Typography variant="h6" color="blue-gray">
                Sale Chart
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...lineChartConfig} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div>
              <Typography variant="h6" color="blue-gray">
                Pie Chart
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="mt-4 grid place-items-center px-2">
            <Chart {...pieChartConfig} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
