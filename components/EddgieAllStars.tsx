import { message, Row } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Overviewservice } from "./Services/OverviewService";
import TableComponent from "./TableComponent";
import eddgieColumns from "./TablesMetaData/eddgieStarsColumnsMeta.json";

const EddgieAllStars = () => {
  const overviewService = new Overviewservice();
  const [eddgieData, setEddgieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchEddgieData = async () => {
    return await overviewService.getEddgieStars();
  };
  useEffect(() => {
    fetchEddgieData()
      .then((res: any) => {
        setEddgieData(res.data.data);
      })
      .catch(() => {
        message.error("Failed loading eddgie All Stars");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <Row justify="center">
        <LoadingOutlined />
      </Row>
    );
  }
  return (
    <Row style={{ backgroundColor: "#1E1E1E", maxHeight: '342px' }}>
      <TableComponent
        columns={eddgieColumns}
        dataSource={eddgieData}
        type="eddgieAllStars"
        isScroll={false}
      />
    </Row>
  );
};
export default EddgieAllStars;
