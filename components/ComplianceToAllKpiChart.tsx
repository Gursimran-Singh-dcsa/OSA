import { Col, Row } from "antd";
import StackedBarChart from "./chart/StackedBarChart";
import styles from "../styles/Home.module.css";

const style: React.CSSProperties = { padding: '8px 0' };
const ComplienceToAllKpiChart = (props: {}): JSX.Element => {
    return (
        <>
            <div >
                <Row justify="space-between"  gutter={[16, 24]}>
                    <Col className={styles.compliance_dotted_border} lg={12} md={12} xs={12}>
                        <div style={style}>{'CORE OSA'}</div>
                        <div style={style}><StackedBarChart /></div>
                    </Col>
                    <Col lg={12} md={12} xs={12}>
                        <div style={style}>{'FULL OSA'}</div>
                        <div style={style}><StackedBarChart /></div>
                    </Col>
                </Row>
            </div>
        </>
    );

}
export default ComplienceToAllKpiChart;
