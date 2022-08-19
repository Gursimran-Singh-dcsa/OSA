import { Col, Row, Spin } from "antd";
import type { NextPage } from "next";
import { useSelector } from "react-redux";
import { ExecuitveSummary } from "../components/executiveSummary";
import FilterSection from "../components/Filters";
import Kpi from "../components/Kpi";
import Overview from "../components/Overview";
import OsaGrowthOpportunities from "../components/OsaGrowthOpportunities"
import KpiComplianceAndTopRetailers from "../components/KpiComplianceAndTopRetailers";
import OSAMonthlyAndWeeklyStats from "../components/OSAMonthlyAndWeeklyStats";
import OverviewRootCauseChart from "../components/OverviewRootCauseChart";
import styles from '../styles/Home.module.css';
import EddgieAllStars from "../components/EddgieAllStars";
import { EXECUTIVE_SUMMARY_LABEL } from "../store/config";

const Home: NextPage = () => {
  const state: any = useSelector((state) => state);
  if (state.filters.loading) return <Spin />;
  return (
    <div className="page">
      <Overview />
      <FilterSection />
      <Kpi />
      <Row style={{marginTop: '1.5rem'}} className={styles.executive_summary_wrapper}><Col xs={24} className={styles.executive_summary_label}>{EXECUTIVE_SUMMARY_LABEL}</Col></Row>
      <OSAMonthlyAndWeeklyStats />
      <KpiComplianceAndTopRetailers/>
      <ExecuitveSummary/>
      <Row style={{marginTop: '1.5rem'}} justify='center' gutter={[16, 8]}>
        <Col xs={24} md={24} lg={12} >
          <OverviewRootCauseChart />
        </Col>
        <Col  xs={24} md={24} lg={12} >
          <EddgieAllStars />
        </Col>
      </Row>
      <OsaGrowthOpportunities />
    </div>
  );
};

export default Home;
