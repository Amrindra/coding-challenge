import { useState } from "react";
import "./TableList.scss";
import { FaSearch } from "react-icons/fa";
import {
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const TableList = ({ donorData, isLoading }) => {
  const [query, setQuery] = useState("");

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <div className="search-container">
          <InputGroup width="500px">
            <InputLeftElement
              pointerEvents="none"
              children={<FaSearch className="icon" />}
            />
            <Input
              type="search"
              placeholder="Search by name"
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>

          <Select placeholder="Sort by" width="200px">
            <option value="option1">Active forms</option>
            <option value="option2">Inactive forms</option>
          </Select>
        </div>

        {isLoading ? (
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="#00754A"
              size="xl"
              m="100"
            />
          </Center>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th className="tableCell">Name</th>
                <th className="tableCell">Email</th>
                <th className="tableCell">Total Donations</th>
                <th className="tableCell">First Donation</th>
              </tr>
            </thead>

            {donorData?.data
              ?.filter((item) => {
                return query.toLowerCase() === ""
                  ? item
                  : item.full_name.toLowerCase().includes(query);
              })
              .map((item) => (
                <tbody key={item.id}>
                  <tr>
                    <td className="tableCell">{item.full_name}</td>
                    <td className="tableCell">{item.email}</td>
                    <td className="tableCell">{item.total_donations}</td>
                    <td className="tableCell">{item.first_donation}</td>
                  </tr>
                </tbody>
              ))}
          </table>
        )}
        <div className="pagination">
          <div className="pagination-left">
            <Text>Row per page:</Text>
            <Select
              placeholder="10"
              width="60px"
              variant="unstyled"
              cursor="pointer"
            >
              <option value="option1">20</option>
              <option value="option2">30</option>
              <option value="option2">40</option>
            </Select>
          </div>
          <div className="pagination-right">
            <Text>1 - 6 of 6</Text>
            <ChevronLeftIcon w={6} h={6} cursor="pointer" />
            <ChevronRightIcon w={6} h={6} cursor="pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableList;
