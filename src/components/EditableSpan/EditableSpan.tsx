import React, {useState, ChangeEvent} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo(({title, changeTitle}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(title);

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        changeTitle(newTitle)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)

    return (
        editMode
            ? <TextField
                color={"primary"}
                variant={"standard"}
                value={newTitle}
                autoFocus
                onChange={onChangeTitle}
                onBlur={offEditMode}
            />
            // ? <input
            //     value={title}
            //     autoFocus
            //     onChange={onChangeTitle}
            //     onBlur={offEditMode}
            // />
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
})

export default EditableSpan