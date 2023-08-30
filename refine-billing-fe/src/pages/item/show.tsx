import { useShow, IResourceComponentsProps, useOne } from "@refinedev/core";
import {
    Show,
    NumberField,
    TextFieldComponent as TextField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const ItemShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: categoryData, isLoading: categoryIsLoading } = useOne({
        resource: "category",
        id: record?.categoryId || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Id
                </Typography>
                <NumberField value={record?.id ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    Name
                </Typography>
                <TextField value={record?.name} />
                <Typography variant="body1" fontWeight="bold">
                    Category
                </Typography>

                {categoryIsLoading ? (
                    <>Loading...</>
                ) : (
                    <>{categoryData?.data?.name}</>
                )}
                <Typography variant="body1" fontWeight="bold">
                    Quantity
                </Typography>
                <NumberField value={record?.quantity ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    Price Purchase
                </Typography>
                <NumberField value={record?.price_purchase ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    Price Sale
                </Typography>
                <NumberField value={record?.price_sale ?? ""} />
            </Stack>
        </Show>
    );
};
