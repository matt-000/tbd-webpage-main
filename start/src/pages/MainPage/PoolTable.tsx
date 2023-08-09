import React from 'react';
import { useTable, useSortBy, Column, CellProps, HeaderGroup, Row } from 'react-table';
import { Link } from "react-router-dom";

type Data = {
    market: string;
    image: string;
    LendingTVL: string;
    Available: string;
    BorrowingTVL: string;
    apr: string;
    supply: string;
    borrow: string;
};

const PoolTable: React.FC = () => {
    const data = React.useMemo<Data[]>(
        () => [
            {
                market: 'DAI/GNS',
                image: '/images/gnsfet.png',
                LendingTVL: 'NA',
                Available: 'NA',
                BorrowingTVL: 'NA',
                apr: 'NA',
                supply: 'Supply',
                borrow: 'Borrow'
            },
            // ... add more data rows as needed
        ],
        []
    );

    const columns = React.useMemo<Column<Data>[]>(
        () => [
            { Header: 'Market', accessor: 'market' },
            { Header: 'Lending TVL', accessor: 'LendingTVL' },
            { Header: 'Available', accessor: 'Available' },
            { Header: 'Borrowing TVL', accessor: 'BorrowingTVL' },
            { Header: 'Avg. APR Range', accessor: 'apr' },
            {
                Header: 'Supply & Borrow',
                Cell: (props: CellProps<Data>) => (
                    <>
                    <Link to="/lend/LGNS"><button className="option-button">Supply</button></Link> | <Link to="/borrow/LGNS"><button className="option-button">Borrow</button></Link>
                    </>
                )
            }
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable<Data>({ columns, data }, useSortBy) as any;  // The casting to 'any' here is a workaround

    return (
        <table {...getTableProps()} className="text-table">
            <thead>
                {headerGroups.map((headerGroup: HeaderGroup<Data>) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps((column as any).getSortByToggleProps())}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row: Row<Data>) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell, index) => {
                                // Check if it's the first column
                                if (index === 0) {
                                    return (
                                        <td {...cell.getCellProps()} className="image-cell">
                                            <img src={row.original.image} alt="Market Image" />
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                }
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default PoolTable;
