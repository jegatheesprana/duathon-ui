import MenuItem from '@mui/material/MenuItem';
import MDInput from "components/MDInput";
import DateTime from "./DateTime";

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const Weekly = ({ membership, setMembership }) => {

    return (
        <DateTime initialValues={{ day: DAYS[0] }} type="weekly" membership={membership} setMembership={setMembership}>
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

export default Weekly;