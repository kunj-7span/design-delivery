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
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { Mail, UserRound, UserRoundPlus, Phone } from "lucide-react";
import { clientFormSchema } from "../../../schema/agency-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserById } from "./userApi";

const ClientItem = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [loadingUser, setLoadingUser] = useState(isEditMode);

  const form = useForm({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (!isEditMode) {
      form.reset({
        name: "",
        email: "",
        phone: "",
      });
      setLoadingUser(false);
      return;
    }

    const loadUser = async () => {
      try {
        setLoadingUser(t = await fetchUserById(id);
        form.reset({
          name: user.name,
          email: user.email,
          phone: user.phone,
        });
      } catch (error) {
        toast.error(error.message || "Unable to load client details");
      } finally {
        setLoadingUser(false);
      }
    };

    loadUser();
  }, [form, id, isEditMode]);

  function onSubmit(data) {
    toast.success(
      isEditMode
        ? "Client updated successfully"
        : "Client created successfully",
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
  }

  return (
    <>
      <h2 className="text-xl font-medium">Clients</h2>
      <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle className="text-lg flex gap-3">
            <UserRoundPlus />
            {isEditMode ? "Edit Client Details" : "Add Client Details"}
          </CardTitle>
          <CardDescription>
            {isEditMode
              ? "Update your client details below"
              : "Enter your client details below to send designs"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingUser ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Loading client details...
            </div>
          ) : (
            <form
              id="form-client"
              className="grid gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-client-name">Name</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="form-client-name"
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
                      <FieldLabel htmlFor="form-client-email">Email</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="form-client-email"
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

                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-client-phone">
                        WhatsApp Number
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="form-client-phone"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter WhatsApp Number"
                          autoComplete="off"
                          type="text"
                          maxLength="10"
                        />
                        <InputGroupAddon>
                          <Phone />
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
            form="form-client"
            className="w-full md:w-50"
            disabled={loadingUser}
          >
            {isEditMode ? "Update Client" : "Create Client"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ClientItem;
