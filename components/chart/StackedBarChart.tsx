import { Avatar, Col, Row, Space } from "antd";
import { BarChart, Bar, ResponsiveContainer, XAxis } from "recharts";
import { ArrowUpOutlined } from "@ant-design/icons";
import styles from "../../styles/Home.module.css";

const data = [
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
];

const StackedBarChart = (props: {}): JSX.Element => {
  return (
    <>
      <Row>
        <Col flex="100px">
          <div className={styles.coreOsaBarChart}>
            <ResponsiveContainer height="100%" width={80}>
              <BarChart data={data}>
                <Bar dataKey="pv" stackId="a" fill="#1F40E3" />
                <Bar dataKey="uv" stackId="a" fill="#4662F0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>
        <Col flex="auto">
          <Col>
            <div className={styles.coreOsaComplianceTitle}>{"Compliance"}</div>
            <Space>
              <span className={styles.coreOsaPercentage}>{"92%"}</span>
              <span style={{borderRadius: '100px', paddingLeft: '0.1rem',paddingRight: '0.1rem', backgroundColor: 'rgba(37, 149, 76, 0.182724)'}}>
                <ArrowUpOutlined
                  style={{ fontSize: "90%", color: "#07D34E" }}
                />
              </span>
              <span className={styles.complianceText}>{"+2%"}</span>
            </Space>
          </Col>
          <Row>
            <Col>
              <div style={{ paddingTop: "20px" }}>
                <div className={styles.osaValueLabel}>{"Value"}</div>
                <div className={styles.coreOsaPercentage}>{"€1083"}</div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default StackedBarChart;
