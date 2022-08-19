import { Badge, Col, Row } from "antd";
import OSAAreaChart from "./chart/OSAAreaChart";

const OSAMonthlyAndWeeklyStats = () => {
  return (
    <Row justify="center" gutter={[16, 32]} style={{ marginTop: "1rem" }}>
      {["weekly", "monthly"].map((type) => {
        return (
          <Col xs={24} md={12} style={{ textTransform: "capitalize" }}>
            <Row style={{ marginBottom: "1rem" }}>{type} OSA</Row>
            <OSAAreaChart type={type} />
            <Row justify="start">
              <Col>
                <Badge status="error" />
                Target Line
              </Col>
            </Row>
          </Col>
        );
      })}
    </Row>
  );
};
export default OSAMonthlyAndWeeklyStats;
