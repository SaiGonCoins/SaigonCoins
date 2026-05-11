/* eslint-disable @typescript-eslint/no-unused-vars */
import { SignupFormSchema, FormState, LoginFormSchema } from '@/app/lib/definitions';


export async function signup(state: FormState, formData: FormData) {

  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    phone: formData.get('phone'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, phone } = validatedFields.data;

  try {
    const response = await fetch("http://localhost:7000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, phone }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: errorData.message || "Đăng ký thất bại. Vui lòng thử lại.",
      };
    }

    // Nếu đăng ký thành công, lấy dữ liệu người dùng
    const userData = await response.json();
    window.location.href = "/login";

    return {
      success: true,
      message: "Đăng ký thành công!",
      user: userData,
    };

  } catch (error) {
    return {
      errors: "Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau.",
    };
  }
}

export async function login(state: FormState, formData: FormData) {

  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await fetch("http://localhost:7000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: errorData.message || "Đăng nhập thất bại. Vui lòng thử lại.",
      };
    }

    const userData = await response.json();

    return {
      success: true,
      message: "Đăng nhập thành công!",
      user: userData,
    };
  } catch (error) {
    return {
      errors: "Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau.",
    };
  }
}
