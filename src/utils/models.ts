export interface TodoType {
    id: string;
    title: string;
    description: string;
    assigned: string;
    deadline: string;
    column: "incomplete" | "progress" | "completed";
    //color: string;
    sortIndex: number;
}