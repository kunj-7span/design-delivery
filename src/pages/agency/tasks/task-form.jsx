import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,

} from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { UserRound, ClipboardList } from "lucide-react";
import { taskFormSchema } from "../../../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import { fetchTaskById } from "./taskApi";

const TaskForm = () => {
    const { id, pid } = useParams();
    const isEditMode = id !== "+";
    const [loadingUser, setLoadingUser] = useState(isEditMode);

    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            name: "",
            description: "",
            employeeName: "",
        },
    });

    useEffect(() => {
        if (!isEditMode) {
            form.reset({
                name: "",
                description: "",
                employeeName: "",
            });
            return;

        }

        const loadUser = async () => {
            try {
                setLoadingUser(true);
                const user = await fetchTaskById(id);
                form.reset({
                    name: user.name || "",
                    description: user.description || "",
                    employeeName: user.assignedTo || "",
                });
            } catch (error) {
                toast.error(error.message || "Unable to load task details");
            } finally {
                setLoadingUser(false);
            }
        };

        loadUser();
    }, [form, id, isEditMode]);

    function onSubmit(data) {
        toast.success(
            isEditMode
                ? "Task updated successfully"
                : "Task created successfully",
            {
                description: (
                    <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
                        <code>{JSON.stringify(data, null, 2)}</code>
                    </pre>
                ),
                classNames: {
                    content: "flex flex-col gap-2",
                },
                style: {
                    "--border-radius": "calc(var(--radius)  + 4px)",
                    background: "",
                },
            },
        );

        form.reset({
            name: "",
            description: "",
            employeeName: "",
        });

        navigate(`/agency/projects/${pid}/tasks`);
    }
    const emp = [
        "Aarav Mehta",
        "Priya Shah",
        "Rohan Verma",
        "Neha Patel",
        "Kunal Joshi",
    ];

    return (
        <>
            <h2 className="text-xl font-medium">Tasks</h2>
            <Card className="w-full mt-4">
                <CardHeader>
                    <CardTitle className="text-lg flex gap-3">
                        <ClipboardList />
                        {isEditMode ? "Edit Task Details" : "Add Task Details"}
                    </CardTitle>
                    <CardDescription>
                        {isEditMode
                            ? "Update your task details below"
                            : "Enter your task details below to send designs"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loadingUser ? (
                        <div className="py-8 text-center text-sm text-muted-foreground">
                            Loading task details...
                        </div>
                    ) : (
                        <form
                            id="form-task"
                            className="grid gap-4"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FieldGroup className="grid grid-cols-1 md:grid-cols-2">


                                <Controller
                                    name="name"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-task-name">Task Name</FieldLabel>
                                            <InputGroup>
                                                <InputGroupInput
                                                    {...field}
                                                    id="form-task-name"
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Enter task name"
                                                    autoComplete="off"
                                                    type="text"
                                                />
                                                <InputGroupAddon>
                                                    <UserRound />
                                                </InputGroupAddon>
                                            </InputGroup>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="employeeName"
                                    control={form.control}
                                    render={({ field, fieldState }) => {

                                        return (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel>Assign Employee</FieldLabel>
                                                <Combobox onValueChange={field.onChange} value={field.value} data-invalid={fieldState.invalid} items={emp} >
                                                    <ComboboxInput placeholder="Select an Employee" />
                                                    <ComboboxContent>
                                                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                                                        <ComboboxList>
                                                            {(item) => (
                                                                <ComboboxItem key={item} value={item}>
                                                                    {item}
                                                                </ComboboxItem>
                                                            )}
                                                        </ComboboxList>
                                                    </ComboboxContent>
                                                </Combobox>
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        );
                                    }}
                                />
                            </FieldGroup>

                            <FieldGroup>
                                <Controller
                                    name="description"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-task-description">
                                                Description(optional)
                                            </FieldLabel>
                                            <InputGroup >
                                                <InputGroupTextarea
                                                    {...field}
                                                    id="form-task-description"
                                                    placeholder="Enter description"
                                                    rows={6}
                                                    className="min-h-10 resize-none"
                                                    aria-invalid={fieldState.invalid}
                                                    maxLength={300}
                                                />
                                                <InputGroupAddon align="block-end">
                                                    <InputGroupText className="tabular-nums">
                                                        {field.value?.length || 0}/300 characters
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="">
                    <Button
                        form="form-task"
                        className="w-full md:w-50"
                        disabled={loadingUser}
                    >
                        {isEditMode ? "Update Task" : "Create Task"}
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
};

export default TaskForm;
