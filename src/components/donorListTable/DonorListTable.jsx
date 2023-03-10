import { useEffect, useState } from "react";
import "./DonorListTable.scss";
import TableList from "./TableList";
import axios from "axios";
import SendMessage from "../message/SendMessage";

const DonorListTable = () => {
  const [donorData, setDonorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://interview.ribbon.giving/api/donors"
        );

        setDonorData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="donor-list-table">
      <div className="donor-wrapper">
        <div className="table-list-info">
          <h3 className="donor-list-title">Ribbon Donor List</h3>
          <p>In Beta now!</p>
          <p>See all those that have given in one place</p>
        </div>

        <TableList donorData={donorData} isLoading={isLoading} />
        <SendMessage donorData={donorData} />
      </div>
    </div>
  );
};

export default DonorListTable;
