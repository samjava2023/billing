import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useMany } from "@refinedev/core";

export const BillList: React.FC<IResourceComponentsProps> = () => {
    const { dataGridProps } = useDataGrid();

    const { data: itemData, isLoading: itemIsLoading } = useMany({
        resource: "item",
        ids: dataGridProps?.rows?.map((item: any) => item?.itemId) ?? [],
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: "Id",
                type: "number",
                minWidth: 50,
            },
            {
                field: "itemId",
                flex: 1,
                headerName: "Item",
                maxWidth: 100,
                renderCell: function render({ value }) {
                    return itemIsLoading ? (
                        <>Loading...</>
                    ) : (
                        itemData?.data?.find((item) => item.id === value)?.name 
                    );
                },
            },
            {
                field: "quantity",
                flex: 1,
                headerName: "Quantity",
                type: "number",
                maxWidth: 100,
            },
            {
                field: "prv",
                flex: 1,
                headerName: "Price $",
                minWidth: 300,
                renderCell: function render({ value }) {
                    return itemIsLoading ? (
                        <>Loading...</>
                    ) : (
                        itemData?.data?.find((item) => item.id === value)?.price_sale
                    );
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
        [itemData?.data],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
