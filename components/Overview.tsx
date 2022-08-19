import { Row, Col, Space } from "antd";
import { stat } from "fs";
import { useSelector } from "react-redux";
import { SALES_EXECUTION_OVERVIEW_LABEL } from "../store/config";
import styles from "../styles/Home.module.css";
import { getFilterText } from "./Utils";
const Overview = () => {
  const state: any = useSelector((state) => state);

  return (
    <Row>
      <Col xs={0} md={12} lg={8} className={styles.overview_label}>
        {SALES_EXECUTION_OVERVIEW_LABEL}
      </Col>
      <Col
        className={styles.overview_detail}
        xs={24}
        md={12}
        lg={16}
        style={{ textAlign: "right" }}
      >
        <Space>
          {state.filters.selectedFilters.businessGroups.length > 0 && <div className={styles.dotted_border}>
            {getFilterText(state.filters.selectedFilters.businessGroups)}
            &nbsp;&nbsp;&nbsp;
          </div>}
          {state.filters.selectedFilters.products.length > 0 && <div className={styles.dotted_border}>
            {getFilterText(state.filters.selectedFilters.products)}
            &nbsp;&nbsp;&nbsp;
          </div>}
          <div>{getFilterText(state.filters.selectedFilters.country)}</div>
        </Space>
      </Col>
    </Row>
  );
};
export default Overview;
