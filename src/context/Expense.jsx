import { createContext, useEffect, useReducer } from 'react'

export const ExpenseContext = createContext({
    expenseList: [],
    addExpense: () => [],
    editExpense: () => [],
    deleteExpense: () => [],
    editValue: null,
    debit:0,
    credit:0,
    balance:0
})

const initialValue = {
    expenseList: [
        {
            id: 1,
            title: "travel",
            description: "i love traveling..",
            category: "travel",
            amount: 600,
            date: "19-09-2026",
            type: "debit"
        }
    ],
    editValue: null

}

const init = () => {
    try {
        const saved = localStorage.getItem("expense");
        return saved ? { ...initialValue, expenseList: JSON.parse(saved) } : initialValue
    } catch (error) {
        console.log(error)
        return initialValue
    }
}

const expenseReducer = (state, action) => {
    switch (action.type) {
        case "add":
            if (state.editValue !== null) {
                const input = action.payload;
                const update = state.expenseList.map((l) => l.id === state.editValue.id ? { ...l, ...input } : l);
                return {
                    ...state,
                    expenseList: update,
                    editValue: null,
                }
            } else {
                const input = action.payload;
                const newExpense = {
                    id: new Date().getTime(),
                    title: input.title,
                    description: input.description,
                    category: input.category,
                    amount: input.amount,
                    date: input.date,
                    type: input.type,
                }
                return {
                    ...state,
                    expenseList: [...state.expenseList, newExpense],
                }
            }
        case "edit":
            const value = action.payload;
            return {
                ...state,
                editValue: value
            }
        case "delete": {
            const id = action.payload;
            const remain = state.expenseList.filter((l) => l.id !== id);
            return {
                ...state,
                expenseList: remain
            }
        }
    }
}

const ExpenseProvider = ({ children }) => {
    const [state, dispatch] = useReducer(expenseReducer, initialValue,init);

    useEffect(() => {
        const data = localStorage.setItem("expense",
            JSON.stringify(state.expenseList)
        );
    }, [state.expenseList])

    const addExpense = (input) => {
        if (!input) {
            alert("all field is required");
            return;
        }

        dispatch({
            type: "add",
            payload: input,
        })
    }
    const editExpense = (id) => {
        const edit = state.expenseList.find((l) => l.id === id);
        dispatch({
            type: "edit",
            payload: edit
        })
    }
    const deleteExpense = (id) => {
        dispatch({
            type: "delete",
            payload: id
        })
    }

    const debit = state.expenseList.filter((l)=>l.type === "debit");

    const credit = state.expenseList.filter((l)=>l.type === "credit");

    const balance = credit - debit;

    const value = {
        expenseList: state.expenseList,
        addExpense,
        editValue: state.editValue,
        editExpense,
        deleteExpense,
        debit,
        credit,
        balance
    }

    return (
        <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
    )
}

export default ExpenseProvider