import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Tooltip from '@mui/joy/Tooltip';
import { CheckedStatus } from '../../data/company';

interface StatutIconProps {
    statut: CheckedStatus;
}

export const StatutIcon = ({statut} : StatutIconProps) => {
    switch (statut) {
        case CheckedStatus.NotDone || "":
            return (
                <Tooltip arrow key={"NotDoneTooltip"} title="Not Done">
                    <RadioButtonUncheckedIcon style={{ color: 'grey' }} />
                </Tooltip>
            );
        case CheckedStatus.Done:
            return (
                <Tooltip arrow key={"DoneTooltip"} title="Done">
                    <CheckCircleIcon style={{ color: 'green' }} />
                </Tooltip>
            );
        case CheckedStatus.ToDo:
            return (
                <Tooltip arrow key={"ToDoTooltip"} title="To Do">
                    <PendingIcon style={{ color: 'orange' }} />
                </Tooltip>
            );
    }
};

export const manageIsChecked = (companyId: number | undefined, currentStatus: CheckedStatus) => {
    const checkedDone = JSON.parse(localStorage.getItem('checkedDone') || '[]');
    const checkedToDo = JSON.parse(localStorage.getItem('checkedToDo') || '[]');

    // Suppression du SIREN des deux listes
    const removeFromList = (list: number[], id: number) => {
        const index = list.indexOf(id);
        if (index !== -1) {
            list.splice(index, 1);
        }
    };

    removeFromList(checkedDone, companyId as number);
    removeFromList(checkedToDo, companyId as number);

    // Ajout du SIREN à la liste appropriée
    if (currentStatus === CheckedStatus.Done) {
        checkedDone.push(companyId);
    } else if (currentStatus === CheckedStatus.ToDo) {
        checkedToDo.push(companyId);
    }

    localStorage.setItem('checkedDone', JSON.stringify(checkedDone));
    localStorage.setItem('checkedToDo', JSON.stringify(checkedToDo));
};

