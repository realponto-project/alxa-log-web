import React, { useEffect, useState } from "react";
import { Row, Col, Typography } from "antd";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { adjust } from "ramda";

import Tag from "../../../Components/Tag";
import formattedDate from "../../../utils/parserDate";
import { statusValues } from "../../../constants/Maintenance/status";

const { Title } = Typography;

const chartSettingsInitial = statusValues.map((elem) => ({
  ...elem,
  disabled: false,
}));

const Chart = ({ data, onChange }) => {
  const [chartSettings, setChartSettings] = useState(chartSettingsInitial);
  const dataParse = data.sort((a, b) => new Date(a.name) - new Date(b.name));

  useEffect(() => {
    onChange(chartSettings);
  }, [chartSettings]);

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Title level={5}>Total por status</Title>
      </Col>
      <Col span={24}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={dataParse}
            height={380}
            margin={{ left: 15 }}
            maxBarSize={13}
          >
            <XAxis
              dataKey={({ name }) => formattedDate(name, "DD/MM/YYYY")}
              axisLine={false}
              tick={{ fontSize: 13 }}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              height={50}
              label={
                <text
                  fontSize="13"
                  textAnchor="end"
                  transform="rotate(270, 13, 143)"
                  x="120"
                  y="140"
                >
                  <tspan>
                    Os totais estão por quantidade de veículos em cada status!
                  </tspan>
                </text>
              }
              tick={{ fontSize: 13 }}
            />
            <CartesianGrid stroke="#d7d7d7" vertical={false} />
            <Tooltip cursor={{ fillOpacity: 0.3 }} />
            {chartSettings.map(({ label, color, value }) => (
              <Bar
                dataKey={label}
                fill={color}
                key={label}
                name={value}
                stackId="a"
                stroke={color}
                type="monotone"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Col>
      <Col span={24}>
        <Row style={{ marginTop: "20px" }} gutter={[8, 8]} wrap={true}>
          <Col span={24}>
            <Title level={5}>LEGENDAS</Title>
          </Col>
          {chartSettings
            .sort((a, b) => a.value - b.value)
            .map(({ color, value, disabled }, idx) => (
              <Col key={`${color}-${value}`} xs={6} sm={6} md={4} lg={4} xl={4}>
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

export default Chart;
