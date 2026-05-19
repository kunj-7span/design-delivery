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
} from "@/components/ui/input-group";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { SquareChartGantt, UserRound } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProjectById } from "./projectApi";
import { projectSchema } from "../../../schema/schema";

const ProjectForm = () => {
  const { id } = useParams();
  const isEditMode = id !== "+";
  const [loadingProject, setLoadingProject] = useState(isEditMode);

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      client: "",
    },
  });

  useEffect(() => {
    if (!isEditMode) {
      form.reset({
        name: "",
        client: "",
      });
      return;
    }

    const loadProject = async () => {
      try {
        setLoadingProject(true);
        const user = await fetchProjectById(id);
        form.reset({
          name: user.name,
          client: user.clientName,
        });
      } catch (error) {
        toast.error(error.message || "Unable to load client details");
      } finally {
        setLoadingProject(false);
      }
    };

    loadProject();
  }, [form, id, isEditMode]);

  function onSubmit(data) {
    toast.success(
      isEditMode
        ? "Project updated successfully"
        : "Project created successfully",
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
      form.reset(),
    );
  }
  const frameworks = ["nirmal", "nirmal patel", "nirmal m. patel"];

  return (
    <>
      <h2 className="text-xl font-medium">Project</h2>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg flex gap-3">
            <SquareChartGantt />
            {isEditMode ? "Edit Project Details" : "Add Project Details"}
          </CardTitle>
          <CardDescription>
            {isEditMode
              ? "Update your project details below"
              : "Enter your project details below to send designs"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingProject ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Loading project details...
            </div>
          ) : (
            <form
              id="form-project"
              className="grid gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-project-name">Name</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="form-project-name"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter Name"
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
                  name="client"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-project-client">
                        Client
                      </FieldLabel>
                      <Combobox
                        items={frameworks}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <ComboboxInput placeholder="Select a framework" />
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
                  )}
                />
              </FieldGroup>
            </form>
          )}
        </CardContent>
        <CardFooter className="">
          <Button
            form="form-project"
            className="w-full md:w-50"
            disabled={loadingProject}
          >
            {isEditMode ? "Update Project" : "Create Project"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProjectForm;
