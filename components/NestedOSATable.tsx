import { message, Row } from "antd";
import { NESTED_OSA_TABLE_TYPE } from "../store/config";
import TableComponent from "./TableComponent";
import nestedColumnMetaData from "./TablesMetaData/NestedOSAColumnsMets.json";
import styles from "../styles/logBook.module.css";
import { useEffect, useState } from "react";
import { NestedOsaTableService } from "./Services/NestedOsaTableService";
import { LoadingOutlined } from "@ant-design/icons";
import OverviewDrawerComponent from "./OverviewDrawerComponent";

const NestedOSATable = () => {
  const nestedOsaTableservice = new NestedOsaTableService();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [nestedOsaData, setNestedOsaData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionId, setActionId] = useState(null);
  useEffect(() => {
    fetchNestedOsaTableData();
  }, [currentPage]);

  const fetchNestedOsaTableData = async () => {
    nestedOsaTableservice
      .getNestedOsaTableData(currentPage, 3)
      .then((res: any) => {
        setNestedOsaData(res.data);
      })
      .catch(() => {
        message.error("Failed loading Next Best Action");
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (loading) {
    return (
      <Row justify="center" className={styles.kpi_wrapper}>
        <LoadingOutlined />
      </Row>
    );
  }
  return (
    <Row style={{backgroundColor: '#242424'}}>
      <Row style={{ marginTop: "1.5rem" }}></Row>
      <Row>Next Best Action</Row>
      <TableComponent
        columns={nestedOsaTableservice.decorateColumns(
          nestedColumnMetaData,
          setActionId
        )}
        type={NESTED_OSA_TABLE_TYPE}
        dataSource={nestedOsaData.data}
        totalPages={nestedOsaData.totalPages}
        currentPage={currentPage}
      />
      <OverviewDrawerComponent showModal={setActionId} actionId={actionId} />
    </Row>
  );
};
export default NestedOSATable;
