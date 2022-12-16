import * as React from "react";
import { styled } from "@mui/material/styles";
import { BiRightArrow } from "react-icons/bi";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import styles from "./styles.module.scss";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  background: "transparent",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<BiRightArrow sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Accordian({ details }) {
  const [expanded, setExpanded] = React.useState("");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className={styles.infos__accordian}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        className={styles.accordian}
      >
        <AccordionSummary
          className={styles.accordian__summary}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          Details
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.infos__accordian_grid}>
            <p>{details[0]}</p>
          </div>
        </AccordionDetails>
        <AccordionDetails className="scrollbar">
          {details.slice(1, details.length).map((info) => (
            <div className={styles.infos__accordian_grid}>
              <span>{info.name}:</span>
              <span>{info.value}</span>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        className={styles.accordian}
      >
        <AccordionSummary
          className={styles.accordian__summary}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          Size & Fit
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.infos__accordian_grid}></div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
