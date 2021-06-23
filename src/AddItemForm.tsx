import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {AddBox} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

export type AddItemPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemPropsType) => {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(title)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddItem()
        }
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    // const errorMessage = error
    //     ? <div className="error-message">Title is required</div>
    //     : null

    return <div>
        <TextField
            variant={"outlined"}
            error={error}
            value={title}
            onChange={onChangeTitle}
            onKeyPress={onKeyPressAddItem}
            label={"Title"}
            helperText={error && "Title is requared"}
            size={"small"}
        />
        {/*<input className={error ? "error" : ""}*/}
        {/*       value={title}*/}
        {/*       onChange={onChangeTitle}*/}
        {/*       onKeyPress={onKeyPressAddItem}*/}
        {/*/>*/}
        {/*<button onClick={onClickAddItem}>+</button>*/}
        <IconButton onClick={onClickAddItem} color={"primary"}>
            <AddBox/>
        </IconButton>
        {/*{errorMessage}*/}
    </div>
})
