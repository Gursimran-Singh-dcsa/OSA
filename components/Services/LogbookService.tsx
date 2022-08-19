import _ from "lodash";
import { mockLogBookData } from "../../store/MockData/mocklogbookData";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Badge } from "antd";
export class Logbookservice {
  getLogBookTableData = (currentPage: number, recordsPerPage: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newData = Object.assign({}, mockLogBookData);
        newData.data = mockLogBookData.data
          .slice(
            (currentPage - 1) * recordsPerPage,
            (currentPage - 1) * recordsPerPage + recordsPerPage
          )
          .map((item, index) => {
            return {
              ...item,
              serialNumber: (currentPage - 1) * recordsPerPage + index + 1,
            };
          });
        resolve({ data: newData });
      }, 1000);
    });
  };

  decorateColumns = (columns: any[] = []) => {
    const columnMeta = columns;
    const currentOSApercentageCol = _.find(columnMeta, {
      dataIndex: "currentOSAPercentage",
    });

    if (currentOSApercentageCol) {
      currentOSApercentageCol.render = (text: string, record: any) => {
        if (record.previousWeekOSAPercentage < record.currentOSAPercentage) {
          return (
            <span
              style={{
                color: "#07D34E",
                fontSize: "0.875rem",
                fontWeight: "900",
              }}
            >
              <Badge count={<ArrowUpOutlined style={{ color: "#07D34E" }} />} />
              {text}
            </span>
          );
        }
        return (
          <span
            style={{ color: "red", fontSize: "0.875rem", fontWeight: "900" }}
          >
            <Badge count={<ArrowDownOutlined style={{ color: "red" }} />} />
            {text}
          </span>
        );
      };
    }

    const actionPerformedCol = _.find(columnMeta, {
      dataIndex: "actionPerformed",
    });

    if (actionPerformedCol) {
      actionPerformedCol.render = (text: string) => {
        return <span style={{ fontSize: "0.75rem" }}>{text}</span>;
      };
    }
    return columnMeta;
  };
}
