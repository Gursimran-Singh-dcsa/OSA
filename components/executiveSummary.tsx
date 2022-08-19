import { Badge, Card, Col, Row, Space } from "antd";
import { ExecuitveBarChart } from "./chart/execuitveBarChart";
import { EXECUTIVE_SUMMARY_LABEL } from "../store/config";
import styles from "../styles/Home.module.css";

export const ExecuitveSummary = () => {
  return (
    <>

    <Row justify="space-between" gutter={[8,16]} style={{marginTop: '1rem'}}>
      {[
        {
          "type": 'CURRENT OSA',
          "Target": '95%'
        },
        {
          "type": 'TARGET OSA',
          "Target": '95%'
        },
        {
          "type": 'DELTA TO MEET TARGET OSA',
          "Target": '95%'
        },
      ].map((data:any,index:number) => {
        // eslint-disable-next-line react/jsx-key
        return <Col xs={24} lg={8} md={12}>
        <Card  key={index + 1} className={styles.card}>
          <Row justify="space-between">
            <Col className={styles.card_title}>{data.type}</Col>
            <Col className={styles.card_type}><Badge status="error" />Target {data.Target} </Col>
          </Row>
          <ExecuitveBarChart />
        </Card>
      </Col>
      })}
    </Row>
    </>
  );
};
