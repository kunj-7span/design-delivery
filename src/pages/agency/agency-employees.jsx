import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { empFormSchema } from "../../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Mail,
  UserRound,
  IdCardLanyard,
} from "lucide-react";



function AgencyEmployees() {

  const form = useForm({
    resolver: zodResolver(empFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });


  function onSubmit(data) {
    toast.success("You submitted the following values:", {
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
    });
  }

  return (
    <div>
      <h2 className="text-xl font-medium">Employees</h2>
      <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle className="text-lg flex gap-3">
            <IdCardLanyard />
            Add Employees
          </CardTitle>
          <CardDescription>
            Enter your employees to assign tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="form-emp"
            className="grid gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-emp-name">Name</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id="form-emp-name"
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
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-emp-email">Email</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id="form-emp-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter email"
                        autoComplete="off"
                        type="email"
                      />
                      <InputGroupAddon>
                        <Mail />
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
        </CardContent>
        <CardFooter className="">
          <Button form="form-emp" className="w-full md:w-50">
            Add Employee
          </Button>
        </CardFooter>
      </Card>
      
    </div>
  );
}

export default AgencyEmployees;
