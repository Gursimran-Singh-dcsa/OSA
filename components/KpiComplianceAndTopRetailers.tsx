import { Col, message, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from "../styles/Home.module.css";
import { COMPLIENCE_TO_ALL_KPIS_LABEL, TOP_TEN_RETAILERS } from '../store/config';
import Card from 'antd/lib/card/Card';
import ComplienceToAllKpiChart from './ComplianceToAllKpiChart';
import { Overviewservice } from "./Services/OverviewService";
import { LoadingOutlined } from "@ant-design/icons";
interface topTenRetailersProps {
  key: string;
  retailerName: string;
  osaPercentage: string
}

const KpiComplianceAndTopRetailers = () => {

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [topRetailersData, setTopRetailersData] = useState<any>({});
  const overViewService = new Overviewservice();
  const fetchRetailersData = async () => {
    overViewService
      .getTopRetailersData()
      .then((response) => {
        setTopRetailersData(response);
      })
      .catch((err) => {
        message.error("Failed Loading retailers Data");
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchRetailersData();
  }, []);
  if (loading) {
    return (
      <Row justify="center" className={styles.kpi_wrapper}>
        <LoadingOutlined />
      </Row>
    );
  }

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
        <Col xs={24} md={12} lg={12} className={styles.osaTableTitle}>
          <Row className={styles.compliance_all_kpi_title} >
            {COMPLIENCE_TO_ALL_KPIS_LABEL}
          </Row>
          <Row style={{marginTop: '1rem'}}>
            <Card className={styles.compliance_all_kpi_card}>
              <div style={{ height: '100%', width: '100%' }}>
                <ComplienceToAllKpiChart />
              </div>
            </Card>
          </Row>
        </Col>
        {!isError && <Col xs={24} md={12} lg={12} >
          <Row className={styles.topTenRetailersTitle} >
            {TOP_TEN_RETAILERS}
          </Row>
          <Row  style={{marginTop: '1rem'}}>
            <Card className={styles.compliance_all_kpi_card}>
              <div style={{ height: '100%', width: '100%' }}>
                <Row justify='center'>
                  <Row className={styles.headerStyle}>
                    <Col className={styles.retailersText} span={12}>{"Retailers"}</Col>
                    <Col className={styles.retailersText} span={12}>{"OSA%"}</Col>
                  </Row>
                  <div className={styles.scroll}>
                    <Row >
                      <Col span={12}>{topRetailersData?.topRetailers?.map((item: topTenRetailersProps) => { return <div className={styles.retailersList}>{item.retailerName}</div> })}</Col>
                      <Col span={12}>{topRetailersData?.topRetailers?.map((item: topTenRetailersProps) => { return <div className={styles.retailersList}>{item.osaPercentage}</div> })}</Col>
                    </Row>
                  </div>
                </Row>
              </div>
            </Card>
          </Row>
        </Col>
        }
        <Col />
      </Row>
    </>
  );
};

export default KpiComplianceAndTopRetailers;