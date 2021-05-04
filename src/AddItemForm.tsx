import React, {useState, KeyboardEvent, ChangeEvent, MouseEvent} from 'react';

type AddItemPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemPropsType){
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(title)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const errorMessage = error
        ? <div className="error-message">Title is required</div>
        : null
    return <div>
        <input className={error ? "error" : ""}
               value={title}
               onChange={onChangeTitle}
               onKeyPress={onKeyPressAddTask}
        />
        <button onClick={addItem}>+</button>
        {errorMessage}
    </div>
}
