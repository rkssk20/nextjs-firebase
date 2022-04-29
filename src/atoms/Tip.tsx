import type { ReactElement } from "react";

import Tooltip from "@mui/material/Tooltip";

 interface TipsProps {
   title: string
   children: ReactElement<any, any>
 }

const Tips = ({ title, children }: TipsProps) => {
  return  (
    <Tooltip title={title} enterTouchDelay={0}>
      {children}
    </Tooltip>
  )
}

export default Tips