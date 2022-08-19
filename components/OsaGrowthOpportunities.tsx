import { Col, Row, TableProps } from "antd";
import { Space, Table } from "antd";
import type { ColumnsType, SorterResult } from "antd/es/table/interface";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import downArrow from "../assets/icons/downArrow.svg";
import sortIcon from "../assets/icons/sortIcon.svg";
import Image from "next/image";
import { fetchTableData, getTableData } from "../store/features/tableData";
import { OSA_GROWTH_OPPORTUNITIES_TABLE_LABEL } from "../store/config";
import NestedOSATable from "./NestedOSATable";
import { UpSquareFilled, DownSquareFilled } from "@ant-design/icons";

interface osaGrowthOpportunitiesProps {
  key: string;
  storeName: string;
  storeCode: string;
  coreOsa: number;
  fullOsa: number;
  npdOsa: number;
  location: string;
  salesUpliftNumber: number;
}

const OsaGrowthOpportunities = () => {
  const [sortedInfo, setSortedInfo] = useState<
    SorterResult<osaGrowthOpportunitiesProps>
  >({});
  const [expandedRows, setexpandedRows] = useState([]);
  const [osaTableData, setOsaTableData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [expanded, setexpanded] = useState(-1);

  useEffect(() => {
    getGrowthOpportunitiesData();
  }, []);

  const getGrowthOpportunitiesData = async () => {
    const tableData = await fetchTableData();
    setOsaTableData(tableData.data);
    setTotalPages(tableData.totalPages);
  };

  const handleChange: TableProps<osaGrowthOpportunitiesProps>["onChange"] = (
    {},
    {},
    sorter
  ) => {
    setSortedInfo(sorter as SorterResult<osaGrowthOpportunitiesProps>);
  };

  const columns: ColumnsType<osaGrowthOpportunitiesProps> = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
      width: "7%",
    },
    {
      title: (
        <span style={{ alignItems: "center" }}>
          {"StoreName"} <Image className={styles.sortIcon} src={sortIcon} />
        </span>
      ),
      dataIndex: "storeName",
      key: "storeName",
      sorter: (a: any, b: any) => a.storeName.localeCompare(b.storeName),
      sortOrder: sortedInfo.columnKey === "storeName" ? sortedInfo.order : null,
      width: "13%",
      ellipsis: true,
    },
    {
      title: "Store Code",
      dataIndex: "storeCode",
      key: "storeCode",
      width: "10%",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: "25%",
    },
    {
      title: "Core OSA",
      dataIndex: "coreOsa",
      key: "coreOsa",
      width: "10%",
    },
    {
      title: "Full OSA",
      dataIndex: "fullOsa",
      key: "fullOsa",
      width: "10%",
    },
    {
      title: "NPD OSA",
      dataIndex: "npdOsa",
      key: "npdOsa",
      width: "10%",
    },
    {
      title: "Sales Uplift No",
      key: "salesUpliftNumber",
      width: "15%",
      render: (_: any, record: any) => (
        <Space size="middle">
          <a>{record.salesUpliftNumber}</a>
          <span
            onClick={() => {
              expandHandler(record.key);
            }}
          >
            {record.key !== expanded ? (
              <DownSquareFilled
                style={{
                  fontSize: "16px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            ) : (
              <UpSquareFilled
                style={{
                  fontSize: "16px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            )}
          </span>
        </Space>
      ),
    },
  ];

  const expandedRowsRender = () => {
    return <NestedOSATable />;
  };

  const handler = (expandedRows: any) => {
    setexpandedRows(expandedRows);
  };

  const expandHandler = (index: any) => {
    if (expanded === index) setexpanded(-1);
    else setexpanded(index);
  };
  return (
    <>
      <Row className={styles.osaTable_wrapper}>
        <Col xs={24} md={24} lg={24} className={styles.osaTableTitle}>
          {OSA_GROWTH_OPPORTUNITIES_TABLE_LABEL}
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={24} lg={24}>
          <Table
            rowClassName="antTable"
            showSorterTooltip={false}
            className={styles.osaTable}
            columns={columns}
            dataSource={osaTableData}
            expandedRowClassName={() => {
              return styles.expnaded_growth_column
            }}
            expandable={{
              showExpandColumn: false,
              expandedRowRender: expandedRowsRender,
            }}
            expandedRowKeys={[expanded]}
            pagination={{
              pageSize: 7,
              total: totalPages,
            }}
            onChange={handleChange}
          />
        </Col>
      </Row>
    </>
  );
};

export default OsaGrowthOpportunities;
