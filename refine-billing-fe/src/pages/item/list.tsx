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

export const ItemList: React.FC<IResourceComponentsProps> = () => {
    const { dataGridProps } = useDataGrid();

    const { data: categoryData, isLoading: categoryIsLoading } = useMany({
        resource: "category",
        ids: dataGridProps?.rows?.map((item: any) => item?.categoryId) ?? [],
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
                field: "name",
                flex: 1,
                headerName: "Name",
                minWidth: 200,
            },
            {
                field: "categoryId",
                flex: 1,
                headerName: "Category",
                minWidth: 300,
                renderCell: function render({ value }) {
                    return categoryIsLoading ? (
                        <>Loading...</>
                    ) : (
                        categoryData?.data?.find((item) => item.id === value)
                            ?.name
                    );
                },
            },
            {
                field: "quantity",
                flex: 1,
                headerName: "Quantity",
                type: "number",
                minWidth: 200,
            },
            {
                field: "pricePurchase",
                flex: 1,
                headerName: "Purchase Price",
                type: "number",
                minWidth: 200,
            },
            {
                field: "priceSale",
                flex: 1,
                headerName: "Sale Price",
                type: "number",
                minWidth: 200,
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
        [categoryData?.data],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
