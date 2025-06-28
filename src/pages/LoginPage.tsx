import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type LoginFields, loginSchema} from "@/api/login.ts";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/hooks/useAuth.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router";


export default function LoginPage() {
    const {loginUser} = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<LoginFields>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFields) => {
        try {
            await loginUser(data);
            toast.success("Login Successful");
            navigate("/products");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Login Failed");
        }

    }

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}
                  className="max-w-sm mx-auto p-8 space-y-4 rounded border shadow-xl"
            >
                <h1>Login Page</h1>

                <div>
                    <Label htmlFor="username" className="mb-1"></Label>
                    <Input
                        autoFocus
                        id="username"
                        {...register("username")}
                        disabled={isSubmitting}
                    />
                    { errors.username && (
                        <div className="text-cf-dark-red">{errors.username.message}</div>
                    )}
                </div>

                <div>
                    <Label htmlFor="password" className="mb-1"></Label>
                    <Input
                        autoFocus
                        type="password"
                        id="password"
                        {...register("password")}
                        disabled={isSubmitting}
                    />
                    { errors.password && (
                        <div className="text-cf-dark-red">{errors.password.message}</div>
                    )}
                </div>

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                </Button>
            </form>
        </>
    )
}