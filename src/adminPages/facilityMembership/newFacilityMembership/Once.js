import MenuItem from '@mui/material/MenuItem';
import MDInput from "components/MDInput";
import DateTime from "./DateTime";
import moment from 'moment'

let DAYS = new Array(31)
DAYS.fill(0)
DAYS = DAYS.map((_, id) => id + 1)

const Once = ({ membership, setMembership }) => {

    return (
        <DateTime inputName="day" initialValues={{ date: moment().format('YYYY-MM-DD'), time: moment().format('HH:mm') }} size={4} type="once" membership={membership} setMembership={setMembership}>
            <MDInput
                type="date"
                label="Date"
                name="date"
                fullWidth
            />
            <MDInput
                type="time"
                label="Time"
                name="time"
                fullWidth
            />
        </DateTime>
    );
}

export default Once;