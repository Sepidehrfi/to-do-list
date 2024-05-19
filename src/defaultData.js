export const defaultData = {
    children: [
        {
            id: "column0",
            type: "container",
            name: "Todo",
            children: [
                {
                    type: "draggable",
                    title: "Netlify Deploy",
                    id: "task1",
                    description: "deploy trello project on netlify",
                },
                {
                    type: "draggable",
                    title: " task 01",
                    id: "task2",
                    description:
                        "Lorem ipsum dolor sit amet, \nconsectetur adipiscing elit, sed do eiusmod tempor\ninci",
                },
            ],
        },
        {
            id: "column1",
            type: "container",
            name: "Doing",
            children: [
                {
                    type: "draggable",
                    title: "10",
                    id: "task3",
                    description:
                        "Lorem ipsum dolor sit amet, \nconsectetur adipiscing elit, sed do eiusmod tempor\nincididunt ut labore et dolore magna aliqua.",
                },
            ],
        },
        {
            id: "column2",
            type: "container",
            name: "Finished",
            children: [
                {
                    type: "draggable",
                    title: "create  card component",
                    id: "task4",
                    description: `create reusable card component with 2 prop: 1. title 2. description`,
                },
            ],
        },
    ],
}

export const defaultTask = {
    type: "draggable",
    title: "Netlify Deploy",
    id: crypto.randomUUID(),
    description: "deploy trello project on netlify",
}
export const defaultColumn = {
    id: crypto.randomUUID(),
    type: "container",
    name: "newColumn",
    children: [
        defaultTask
    ],
}