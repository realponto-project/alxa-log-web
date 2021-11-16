import React, { useEffect, useState } from "react";
import { Row, Col, Typography } from "antd";
import {
  ComposedChart,
  Bar,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cnpj } from "cpf-cnpj-validator";

import Tag from "../../../Components/Tag";
import { statusValues } from "../../../constants/Maintenance/status";
import { adjust } from "ramda";

const { Title } = Typography;

const chartSettingsInitial = statusValues.map((elem) => ({
  ...elem,
  disabled: false,
}));

const VerticalChart = ({ orderOperationStatus, onChange }) => {
  const [chartSettings, setChartSettings] = useState(chartSettingsInitial);

  const data = orderOperationStatus.map(({ operation, count, status }) => ({
    status,
    count,
    name: `${operation.name} \n ${
      operation.company ? cnpj.format(operation.company.document) : ""
    }`,
  }));
  const parserDataOrders = data.reduce((arr, next) => {
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

  useEffect(() => {
    onChange(chartSettings);
  }, [chartSettings]);

  return (
    <Row>
      <Col span={24}>
        <Title level={5}>Total por operação</Title>
      </Col>
      <Col span={24}>
        <ResponsiveContainer width="100%" height={800}>
          <ComposedChart
            layout="vertical"
            height="100%"
            data={parserDataOrders.sort((a, b) => a.value - b.value)}
            margin={{
              top: 50,
              right: 20,
              bottom: 20,
              left: 100,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" scale="band" />
            <Tooltip />
            {chartSettings.map(({ label, color, value }) => (
              <Bar
                dataKey={label}
                fill={color}
                key={label}
                name={value}
                stroke={color}
                type="monotone"
                barSize={20}
                stackId="a"
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </Col>
      <Col span={24}>
        <Row style={{ marginTop: "20px" }} gutter={[8, 8]} wrap={true}>
          <Col span={24}>
            <Title level={5}>LEGENDAS</Title>
          </Col>
          {chartSettings.map(({ color, value, label, disabled }, idx) => (
            <Col key={label} xs={6} sm={6} md={4} lg={4} xl={4}>
              <Tag
                onClick={() => {
                  setChartSettings(
                    adjust(
                      idx,
                      (elem) => ({ ...elem, disabled: !elem.disabled }),
                      chartSettings
                    )
                  );
                }}
                  disabled={disabled}
                color={color}
              >
                {value}
              </Tag>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default VerticalChart;
