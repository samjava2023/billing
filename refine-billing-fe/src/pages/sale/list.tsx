import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    TagField,
    DateField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useMany } from "@refinedev/core";

export const SaleList: React.FC<IResourceComponentsProps> = () => {
    const { dataGridProps } = useDataGrid();

    const { data: customerData, isLoading: customerIsLoading } = useMany({
        resource: "customer",
        ids: dataGridProps?.rows?.map((item: any) => item?.customerId) ?? [],
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });

    const { data: billData, isLoading: billIsLoading } = useMany({
        resource: "bill",
        ids: [].concat(
            ...(dataGridProps?.rows?.map((item: any) => item?.billId) ?? []),
        ),
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });

    // console.log("compare billdata",billData?.data?.find(
    //     (resourceItems) =>
    //         resourceItems.id === 1,
    // ))

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: "Id",
                type: "number",
                minWidth: 50,
            },
            {
                field: "customerId",
                flex: 1,
                headerName: "Customer",
                minWidth: 300,
                renderCell: function render({ value }) {
                    return customerIsLoading ? (
                        <>Loading...</>
                    ) : (
                        customerData?.data?.find((item) => item.id === value)
                            ?.name
                    );
                },
            },
            {
                field: "billId",
                flex: 1,
                headerName: "Bill",
                minWidth: 300,
                renderCell: function render({ value }) {
                    return billIsLoading ? (
                        <>Loading...</>
                    ) : (
                        <>
                            {value?.map((item: any, index: number) => (
                                <TagField
                                    key={index}
                                    value={item}
                                />
                            ))}
                        </>
                    );
                },
            },
            {
                field: "dateSale",
                flex: 1,
                headerName: "Date Sale",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "actions",
                headerName: "Actions",
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            <ShowButton hideText recordItemId={row.id} />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [customerData?.data, billData?.data],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
