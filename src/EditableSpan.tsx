import {useState} from "react";
import TextField from '@mui/material/TextField';

type EditableSpanPropsTitle = {
    title: string
    editeItemTitle: (editedItemTitle: string) => void
    spanClassName?: string
}
export const EditableSpan = ({title, editeItemTitle, spanClassName}: EditableSpanPropsTitle) => {
    const [isEdit, setIsEdit] = useState(false)
    const [itemTitle, setItemTitle] = useState(title)
    const onEdit = () => setIsEdit(true)
    const offEdit = () => {
        editeItemTitle(itemTitle)
        setIsEdit(false)
    }
    return (
        <>
            {isEdit
                ? <TextField variant="standard" autoFocus
                             value={itemTitle}
                             onBlur={offEdit}
                             onKeyDown={(e) => e.key === 'Enter' && offEdit()}
                             onChange={(e) => setItemTitle(e.currentTarget.value)}/>
                : <span className={spanClassName} onDoubleClick={onEdit}>{title}</span>}
        </>
    );
};

