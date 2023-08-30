import {
    useShow,
    IResourceComponentsProps,
    useOne,
    useMany,
} from "@refinedev/core";
import { Show, NumberField, TagField, DateField } from "@refinedev/mui";
import { Typography, Stack, Box } from "@mui/material";

export const SaleShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: customerData, isLoading: customerIsLoading } = useOne({
        resource: "customer",
        id: record?.customerId || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    const { data: billData, isLoading: billIsLoading } = useMany({
        resource: "bill",
        ids: record?.billId || [],
        queryOptions: {
            enabled: !!record && !!record?.billId?.length,
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
                    Customer
                </Typography>

                {customerIsLoading ? (
                    <>Loading...</>
                ) : (
                    <>{customerData?.data?.name}</>
                )}
                <Typography variant="body1" fontWeight="bold">
                    Bill
                </Typography>
                <Box sx={{display:"flex", justifyContent:"left"}}>
                {billIsLoading && record?.billId?.length ? (
                    <>Loading...</>
                ) : (
                    record?.billId.map((bill: any, index: number) => (
                        <TagField
                            key={index}
                            value={bill}
                        />
                    )
                ))}
                </Box>
                <Typography variant="body1" fontWeight="bold">
                    Date Sale
                </Typography>
                <DateField value={record?.dateSale} />
            </Stack>
        </Show>
    );
};
