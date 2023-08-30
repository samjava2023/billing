import { useShow, IResourceComponentsProps } from "@refinedev/core";
import {
    Show,
    NumberField,
    TextFieldComponent as TextField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const CustomerShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

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
                    Mobile
                </Typography>
                <NumberField value={record?.mobile ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    City
                </Typography>
                <TextField value={record?.city} />
            </Stack>
        </Show>
    );
};
