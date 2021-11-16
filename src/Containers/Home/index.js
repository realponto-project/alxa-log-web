import React from "react";
import { Row, Col, Card, Typography, Button, Space, DatePicker } from "antd";
import { connect } from "react-redux";
import { compose } from "ramda";

import BarChart from "./BarChart";
import VerticalChart from "./VerticalChart";
import OrdersSvg from "../../Assets/orders.svg";
import CustomersSvg from "../../Assets/customers.svg";
import styles from "./style.module.css";
import CheckoutSvg from "../../Assets/checkout.svg";
import AvailableSVG from "../../Assets/available.svg";
import { CardStatus } from "../../Components/CardStatus";

const { RangePicker } = DatePicker;

const Home = ({
  dateChoosed,
  goToOrders,
  handleChangeDate,
  orderOperationStatus,
  orderStatus,
  querDate,
  onChangeBarChart,
  onChangeVerticalChart,
  theme,
}) => {
  const vehicleTotal = orderStatus
    .filter(
      ({ status }) =>
        status !== "check-out" &&
        status !== "solicitation" &&
        status !== "cancel"
    )
    .reduce((acc, prev) => acc + Number(prev.count), 0);

  const vehicleTotalAvailable = orderStatus
    .filter(({ status }) => status === "avaiable")
    .reduce((acc, prev) => acc + Number(prev.count), 0);

  const vehicleTotalfinished = orderStatus
    .filter(({ status }) => status === "check-out")
    .reduce((acc, prev) => acc + Number(prev.count), 0);

  const vehicleTotalSolicitacion = orderStatus
    .filter(({ status }) => status === "solicitation")
    .reduce((acc, prev) => acc + Number(prev.count), 0);

  const total = orderStatus.reduce((acc, prev) => acc + Number(prev.count), 0);

  const parserDataOrders = orderStatus.reduce((arr, next) => {
    const findItem = arr.find((item) => item.name === next.name);
    if (findItem) {
      arr = arr.map((item) =>
        item.name === next.name ? { ...item, [next.status]: next.count } : item
      );
    }

    if (!findItem) {
      arr = [...arr, { name: next.name, [next.status]: next.count }];
    }

    return arr;
  }, []);

  return (
    <Row gutter={[18, 26]}>
      <Col span={24}>
        <Row justify="end">
          <Space size="middle">
            <Button
              onClick={() => handleChangeDate("today")}
              ghost={dateChoosed === "today"}
              className={
                dateChoosed === "today" && styles[`button-activeted-${theme}`]
              }
              size="small"
              shape="round"
            >
              Hoje
            </Button>
            <Button
              onClick={() => handleChangeDate("week")}
              ghost={dateChoosed === "week"}
              className={
                dateChoosed === "week" && styles[`button-activeted-${theme}`]
              }
              size="small"
              shape="round"
            >
              7 dias
            </Button>
            <Button
              onClick={() => handleChangeDate("month")}
              ghost={dateChoosed === "month"}
              className={
                dateChoosed === "month" && styles[`button-activeted-${theme}`]
              }
              size="small"
              shape="round"
            >
              30 dias
            </Button>

            <RangePicker
              allowClear={false}
              format="DD-MM-YYYY"
              value={[querDate.start, querDate.end]}
              className={
                dateChoosed === "custom" && styles[`button-activeted-${theme}`]
              }
              onChange={(dates) => handleChangeDate("custom", { dates })}
              bordered={true}
            />
          </Space>
        </Row>
      </Col>

      <Col span={6}>
        <CardStatus
          total={total}
          count={vehicleTotalSolicitacion}
          redirectPage={() => goToOrders(["solicitation"])}
          title="Solicitações"
          srcImage={CustomersSvg}
        />
      </Col>

      <Col span={6}>
        <CardStatus
          total={total}
          count={vehicleTotal}
          redirectPage={() =>
            goToOrders([
              "check-in",
              "avaiable",
              "parking",
              "courtyard",
              "awaiting_repair",
              "dock",
              "wash",
              "supply",
              "external_service",
            ])
          }
          title="Em serviço"
          srcImage={OrdersSvg}
        />
      </Col>

      <Col span={6}>
        <CardStatus
          total={total}
          count={vehicleTotalAvailable}
          redirectPage={() => goToOrders(["avaiable"])}
          title="Liberados"
          srcImage={AvailableSVG}
        />
      </Col>

      <Col span={6}>
        <CardStatus
          total={total}
          count={vehicleTotalfinished}
          redirectPage={() => goToOrders(["check-out"])}
          title="Concluídos"
          srcImage={CheckoutSvg}
        />
      </Col>

      <Col span={24}>
        <Row gutter={[18, 36]}>
          <Col span={24}>
            <Card bordered={false} className={styles.cardChart}>
              <BarChart data={parserDataOrders} onChange={onChangeBarChart} />
            </Card>
          </Col>

          <Col span={24}>
            <Card bordered={false} className={styles.cardChart}>
              <VerticalChart
                orderOperationStatus={orderOperationStatus}
                onChange={onChangeVerticalChart}
              />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ theme }) => ({
  theme,
});

const enhanced = compose(connect(mapStateToProps));

export default enhanced(Home);
