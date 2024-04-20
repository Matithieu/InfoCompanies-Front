import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import PendingIcon from "@mui/icons-material/Pending"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import Tooltip from "@mui/joy/Tooltip"
import { CheckStatus } from "../../../data/types/company"

interface StatutIconProps {
  statut: CheckStatus
}

export const StatutIcon = ({ statut }: StatutIconProps) => {
  switch (statut) {
    case CheckStatus.NOT_DONE || "":
      return (
        <Tooltip arrow key={"NotDoneTooltip"} title="Not Done">
          <RadioButtonUncheckedIcon style={{ color: "grey" }} />
        </Tooltip>
      )
    case CheckStatus.DONE:
      return (
        <Tooltip arrow key={"DoneTooltip"} title="Done">
          <CheckCircleIcon style={{ color: "green" }} />
        </Tooltip>
      )
    case CheckStatus.TO_DO:
      return (
        <Tooltip arrow key={"ToDoTooltip"} title="To Do">
          <PendingIcon style={{ color: "orange" }} />
        </Tooltip>
      )
  }
}

export const manageIsChecked = (
  companyId: number | undefined,
  currentStatus: CheckStatus
) => {
  const checkedDone = JSON.parse(localStorage.getItem("checkedDone") || "[]")
  const checkedToDo = JSON.parse(localStorage.getItem("checkedToDo") || "[]")

  // Suppression du SIREN des deux listes
  const removeFromList = (list: number[], id: number) => {
    const index = list.indexOf(id)
    if (index !== -1) {
      list.splice(index, 1)
    }
  }

  removeFromList(checkedDone, companyId as number)
  removeFromList(checkedToDo, companyId as number)

  // Ajout du SIREN à la liste appropriée
  if (currentStatus === CheckStatus.DONE) {
    checkedDone.push(companyId)
  } else if (currentStatus === CheckStatus.TO_DO) {
    checkedToDo.push(companyId)
  }

  localStorage.setItem("checkedDone", JSON.stringify(checkedDone))
  localStorage.setItem("checkedToDo", JSON.stringify(checkedToDo))
}
