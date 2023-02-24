import React, {useState} from "react";
import Icon from "@mui/material/Icon";
import { Collapse } from "@mui/material";
import MDBox from "components/MDBox";
import Link from "@mui/material/Link";
import SidenavCollapse from "./SidenavCollapse";
import Sidenav from ".";
import MDTypography from "components/MDTypography";
import { useLocation, NavLink } from "react-router-dom";



const MultiLevelMenu = ({ items, name, icon }) => {
	const location = useLocation();
	const collapseName = location.pathname.replace("/", "");
	let textColor = "white";
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen((prev) => !prev);
	};

	return (
		<>
			<SidenavCollapse name={name} icon={icon} onClick={handleClick} expand={true} open={open} />
			<Collapse in={open} timeout="auto" unmountOnExit sx={{px:2}}>
				{ items.map(({ type, name, icon, title, noCollapse, key, href, route, items }) => {
					let returnValue;

					if (type === "collapse" || type==="multi") {
						returnValue = href ? (
							<Link
								href={href}
								key={key}
								target="_blank"
								rel="noreferrer"
								sx={{ textDecoration: "none" }}
							>
								<SidenavCollapse
									name={name}
									icon={icon}
									active={key === collapseName}
									noCollapse={noCollapse}
								/>
							</Link>
						) : (
							<NavLink key={key} to={route}>
								<SidenavCollapse name={name} icon={icon} active={key === collapseName} />
							</NavLink>
						);
					} else if (type === "title") {
						returnValue = (
							<MDTypography
								key={key}
								color={textColor}
								display="block"
								variant="caption"
								fontWeight="bold"
								textTransform="uppercase"
								pl={3}
								mt={2}
								mb={1}
								ml={1}
							>
								{title}
							</MDTypography>
						);
					} 

					return returnValue;
				})}
			</Collapse>
		</>
	);
};

export default MultiLevelMenu