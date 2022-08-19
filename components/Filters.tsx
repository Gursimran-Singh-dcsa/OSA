import { Button, Col, Dropdown, Menu, Radio, Row, Slider, Space } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Home.module.css";
import { DownOutlined, UpOutlined, CalendarOutlined } from "@ant-design/icons";
import {
  addFilter,
  deleteFilter,
  selectAllFilter,
  deleteAllFilter,
} from "../store/features/filters";
import { getFilterText } from "./Utils";
import { SliderMarks } from "antd/lib/slider";

const FilterSection = () => {
  const { allFilters, selectedFilters } = useSelector(
    (state: any) => state.filters
  );

  const dispatch = useDispatch();

  const [FilterOpened, setFilterOpened] = useState<
    | "businessGroups"
    | ""
    | "region"
    | "country"
    | "products"
    | "retailers"
    | "allStores"
  >("");

  const marks: SliderMarks = {
    "-52": {
      style: {
        color: "#fff",
      },
      label: <strong>-52</strong>,
    },
    "0": {
      style: {
        color: "#fff",
      },
      label: <strong>0</strong>,
    },
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <h4 style={{ color: "white" }}>Week Range</h4>
        <Slider
          marks={marks}
          trackStyle={{ backgroundColor: "#2251ff" }}
          range
          defaultValue={[-52, 0]}
          min={-52}
          max={0}
        />
      </Menu.Item>
    </Menu>
  );

  const getMenu = (type = "businessGroups") => {
    let selectedData: any = [];
    selectedData = selectedFilters[type].map((filter: string) =>
      filter.toLowerCase()
    );
    return (
      <Menu>
        {allFilters[type].map((filterVal: string, index: number) => {
          return (
            <>
              {"allStores" === type && index === 0 && (
                <Menu.Item key={"selectAll"}>
                  <Radio
                    checked={selectedData.length === allFilters[type].length}
                    value={
                      selectedData.length === allFilters[type].length
                        ? "checked"
                        : "unchecked"
                    }
                    onClick={(e: any) => {
                      (window as any).a = e.target;
                      if (e.target.value === "checked") {
                        // already checked code to unselect all filters
                        dispatch(
                          deleteAllFilter({
                            filterType: type,
                          })
                        );
                        e.target.value = "unchecked";
                      } else {
                        // code to select all filters
                        dispatch(selectAllFilter({ filterType: type }));
                        e.target.value = "checked";
                      }
                    }}
                  >
                    {selectedData.length !== allFilters[type].length
                      ? "Select All Stores"
                      : "Unselect all Stores"}
                  </Radio>
                </Menu.Item>
              )}
              <Menu.Item key={index}>
                <Radio
                  checked={selectedData.includes(filterVal.toLowerCase())}
                  value={
                    selectedData.includes(filterVal.toLowerCase())
                      ? "checked"
                      : "unchecked"
                  }
                  onClick={(e: any) => {
                    setFilterOpened("");
                    if (e.target.value === "checked") {
                      // already checked code to unselect filter
                      dispatch(
                        deleteFilter({
                          filterType: type,
                          valueToRemove: filterVal,
                        })
                      );
                      e.target.value = "unchecked";
                    } else {
                      // code to select filter
                      dispatch(
                        addFilter({ filterType: type, newValue: filterVal })
                      );
                      e.target.value = "checked";
                    }
                  }}
                >
                  {filterVal}
                </Radio>
              </Menu.Item>
            </>
          );
        })}
      </Menu>
    );
  };
  return (
    <Row className={styles.filter_wrapper}>
      <Col xs={24}>
        <Row
          className={styles.filter_container}
          gutter={[16, 24]}
          justify="space-between"
        >
          {[
            "businessGroups",
            "region",
            "country",
            "products",
            "retailers",
            "allStores",
          ].map((type: any, index: number) => {
            return (
              <Dropdown
                placement="bottom"
                key={index + 1}
                className={`${styles.filter_width}
                  ${selectedFilters[type].length > 0
                    ? styles.filter_active_dropdown
                    : styles.filter_dropdown}`
                }
                overlay={getMenu(type)}
                trigger={["click"]}
                onVisibleChange={(visible) => {
                  if (visible) setFilterOpened(type);
                  else setFilterOpened("");
                }}
                overlayClassName={styles.filter_dropdown_plate}
              >
                <Button>
                  {selectedFilters[type].length > 0
                    ? getFilterText(selectedFilters[type])
                    : allFilters[type][0]}
                  {type === FilterOpened ? <UpOutlined /> : <DownOutlined />}
                </Button>
              </Dropdown>
            );
          })}
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            overlayClassName={`${styles.filter_dropdown_plate} ${styles.time_width}`}
          >
            <Button className={styles.filter_dropdown}>
              <CalendarOutlined />
            </Button>
          </Dropdown>
        </Row>
      </Col>
    </Row>
  );
};

export default FilterSection;
