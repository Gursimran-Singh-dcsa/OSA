import _ from "lodash";
import { nestedOSaTableData } from "../../store/MockData/nestedOsaData";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
export class NestedOsaTableService {
  getNestedOsaTableData = (currentPage: number, recordsPerPage: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newData = Object.assign({}, nestedOSaTableData);
        newData.data = nestedOSaTableData.data
          .slice(
            (currentPage - 1) * recordsPerPage,
            (currentPage - 1) * recordsPerPage + recordsPerPage
          )
          .map((item: any, index: any) => {
            return {
              ...item,
              serialNumber: (currentPage - 1) * recordsPerPage + index + 1,
            };
          });
        resolve({ data: newData });
      }, 1000);
    });
  };

  decorateColumns = (columns: any[] = [], setActionId: any) => {
    const columnMeta = columns;
    const targetOSApercentageCol = _.find(columnMeta, {
      dataIndex: "targetOSAPercentage",
    });

    if (targetOSApercentageCol) {
      targetOSApercentageCol.render = (text: string, record: any) => {
        if (record.currentOSAPercentage > record.targetOSAPercentage) {
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
    const statusCol = _.find(columnMeta, {
      dataIndex: "status",
    });

    if (statusCol) {
      statusCol.render = (text: string, record: any) => {
        return (
          <span
            style={{
              color: "green",
              fontSize: "0.875rem",
              fontWeight: "900",
              cursor: "pointer",
            }}
            onClick={() => {
              setActionId(record.actionId);
            }}
          >
            {text}&nbsp; &nbsp;
            <Badge count={<ArrowRightOutlined style={{ color: "white" }} />} />
          </span>
        );
      };
    }
    return columnMeta;
  };
}
