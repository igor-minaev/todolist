import {useState} from "react";

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
                ? <input
                    autoFocus
                    value={itemTitle}
                    onBlur={offEdit}
                    onKeyDown={(e) => e.key === 'Enter' && offEdit()}
                    onChange={(e) => setItemTitle(e.currentTarget.value)}/>
                : <span className={spanClassName} onDoubleClick={onEdit}>{title}</span>}
        </>
    );
};

