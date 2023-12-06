import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import PendingIcon from '@mui/icons-material/Pending';
import { CheckedStatus } from '../../data/company';

export const StatutIcon = ({ statut }: { statut?: CheckedStatus }) => {
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

export const manageIsChecked = (companySiren: string | undefined, currentStatus: CheckedStatus) => {
    const checkedDone = JSON.parse(localStorage.getItem('checkedDone') || '[]');
    const checkedToDo = JSON.parse(localStorage.getItem('checkedToDo') || '[]');

    // Suppression du SIREN des deux listes
    const removeFromList = (list: string[], siren: string) => {
        const index = list.indexOf(siren);
        if (index !== -1) {
            list.splice(index, 1);
        }
    };

    removeFromList(checkedDone, companySiren as string);
    removeFromList(checkedToDo, companySiren as string);

    // Ajout du SIREN à la liste appropriée
    if (currentStatus === CheckedStatus.Done) {
        checkedDone.push(companySiren);
    } else if (currentStatus === CheckedStatus.ToDo) {
        checkedToDo.push(companySiren);
    }

    localStorage.setItem('checkedDone', JSON.stringify(checkedDone));
    localStorage.setItem('checkedToDo', JSON.stringify(checkedToDo));
};

