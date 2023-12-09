import styled from "styled-components";

/*
  TableModel
*/
export const TableModel = styled.table`
    overflow: scroll;
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    color: white;

    th,
    td {
        border: 1px solid #ffffff1f;
        padding: 8px;
        text-align: left;
    }

    tr:nth-child(odd) {
    }

    tr:nth-child(even) {
        background-color: transparent;
    }

    tr:first-child th {
        border-top: none;
    }

    tr th:last-child {
        border: none;
    }

    .delete-icon {
        cursor: pointer;
        color: red;
    }
`;
