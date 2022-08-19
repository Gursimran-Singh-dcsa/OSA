import { Badge } from "antd";

export const getFilterText = (selectedFilters: Array<string>) => {
  return (
    <span>
      {selectedFilters[0]}
      {selectedFilters.length > 1 ? <>&nbsp;&nbsp;<Badge count={`+${selectedFilters.length - 1}`} className={`site-badge-count-${selectedFilters.length - 1}`} style={{backgroundColor: '#2251ff'}} /></>: ""}
    </span>
  );
};
