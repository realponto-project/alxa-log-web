import React, { useEffect, useState } from "react";
import qs from "qs";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { applySpec, not, path, pipe, prop } from "ramda";

import HomeContainer from "../../Containers/Home";
import {
  getByStatus,
  // getByStatusCompany,
  getByStatusOperation,
} from "../../Services/Summary";
import GAInitialize from "../../utils/ga";
import { statusValues } from "../../constants/Maintenance/status";

const Home = () => {
  const history = useHistory();
  const [orderStatus, setOrderStatus] = useState([]);
  const [statusFilterToGetByStatus, setStatusFilterToGetByStatus] = useState(
    statusValues.map(prop("label"))
  );
  const [statusFilterToOperationAll, setStatusFilterToOperationAll] = useState(
    statusValues.map(prop("label"))
  );
  const [orderOperationStatus, setOrderOperationStatus] = useState([]);
  const [querDate, setQueryDate] = useState({
    start: moment().subtract(1, "month").startOf("day"),
    end: moment().endOf("day"),
  });
  const [dateChoosed, setDateChoosed] = useState("month");

  GAInitialize("/home");

  const getByStatusAll = async (params) => {
    try {
      const { data } = await getByStatus(params);
      setOrderStatus(data);
    } catch (error) {
      window.onerror(
        `maintenanceOrderStatusSummary: ${error.error}`,
        window.location.href
      );
    }
  };

  // const getByCompanyAll = async () => {
  //   try {
  //     const { data } = await getByStatusCompany()
  //     setOrderCompanyStatus(data)
  //   } catch (error) {
  //     console.log('cannot find values of dashboard!')
  //   }
  // }

  const getByOperationAll = async (params) => {
    try {
      const { data } = await getByStatusOperation(params);
      setOrderOperationStatus(data);
    } catch (error) {
      window.onerror(
        `maintenanceOrderOperationStatusSummary: ${error.error}`,
        window.location.href
      );
    }
  };

  const goToOrders = (status) => {
    const searchValueLocal = qs.parse(localStorage.getItem("searchValue"));
    const queryFilters = qs.stringify({ ...searchValueLocal, status });

    localStorage.setItem("searchValue", queryFilters);
    history.push({
      pathname: "/logged/maintenance/manager",
      search: queryFilters,
    });
  };

  const handleChangeDate = (type, options = {}) => {
    setDateChoosed(type);

    const end = moment().endOf("day");
    const { dates } = options;

    switch (type) {
      case "today":
        setQueryDate({ start: moment().startOf("day"), end });
        break;
      case "week":
        setQueryDate({
          start: moment().subtract(1, "week").startOf("day"),
          end,
        });
        break;
      case "month":
        setQueryDate({
          start: moment().subtract(1, "month").startOf("day"),
          end,
        });
        break;
      case "custom":
        setQueryDate({ start: dates[0], end: dates[1] });

        break;
    }
  };

  useEffect(() => {
    const dates = applySpec({
      start: path(["start", "_d"]),
      end: path(["end", "_d"]),
    })(querDate);

    // getByCompanyAll()
    getByStatusAll({
      dates,
      status:
        statusFilterToGetByStatus.length !== 0
          ? statusFilterToGetByStatus
          : "empty",
    });
  }, [querDate, statusFilterToGetByStatus]);

  useEffect(() => {
    const dates = applySpec({
      start: path(["start", "_d"]),
      end: path(["end", "_d"]),
    })(querDate);

    getByOperationAll({
      dates,
      status:
        statusFilterToOperationAll.length !== 0
          ? statusFilterToOperationAll
          : "empty",
    });
  }, [querDate, statusFilterToOperationAll]);

  return (
    <HomeContainer
      dateChoosed={dateChoosed}
      goToOrders={goToOrders}
      handleChangeDate={handleChangeDate}
      onChangeBarChart={(values) => {
        setStatusFilterToGetByStatus(
          values.filter(pipe(prop("disabled"), not)).map(prop("label"))
        );
      }}
      onChangeVerticalChart={(values) => {
        setStatusFilterToOperationAll(
          values.filter(pipe(prop("disabled"), not)).map(prop("label"))
        );
      }}
      // orderCompanyStatus={orderCompanyStatus}
      orderOperationStatus={orderOperationStatus}
      orderStatus={orderStatus}
      querDate={querDate}
    />
  );
};

export default Home;
