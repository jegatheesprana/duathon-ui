import MenuItem from '@mui/material/MenuItem';
import MDInput from "components/MDInput";
import DateTime from "./DateTime";

let DAYS = new Array(31)
DAYS.fill(0)
DAYS = DAYS.map((_, id) => id + 1)

const Monthly = ({ membership, setMembership }) => {

    return (
        <DateTime inputName="day" initialValue={{ day: DAYS[0] }} type="monthly" membership={membership} setMembership={setMembership}>
            <MDInput
                select
                label="Day"
                name="day"
                fullWidth
                InputProps={{
                    style: {
                        height: '44.13px'
                    }
                }}
            >
                {DAYS.map((day, id) => (
                    <MenuItem value={day} key={day + id}>
                        {day}
                    </MenuItem>
                ))}
            </MDInput>
        </DateTime>
    );
}

export default Monthly;