"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// mui
import { Box, Button, TextField, Typography } from "@mui/material";
// formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../redux/reducers/auth";
import { useRouter } from "next/navigation";
import { isLoggedInSelector, messageErrorSelector } from "../redux/selectors";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const messageError = useSelector(messageErrorSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);

  const notify = () => toast.error(messageError);
  const [key, setKey] = useState(true);

  useEffect(() => {
    if (messageError.length > 0) {
      notify();
      isLoggedIn && router.push("/");
    }
  }, [key]);

  useEffect(() => {
    isLoggedIn && router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      if (values) {
        await dispatch(login(values)).catch((err) => {});

        setKey(!key);
      } else {
        notify("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is Required!")
        .email("Invalid E-mail adress."),
      password: Yup.string()
        .required("Password is Required!")
        .min(6, "Password must be more than 6 characters."),
    }),
  });

  return (
    <>
      <div className="bg-login"></div>
      <div className=" m-auto shadow-2xl p-10 rounded-lg z-10 bg-slate-100 opacity-95">
        <Toaster position="bottom-center" />
        {/* Register Form */}
        <Box
          sx={{
            width: { xs: "100%", md: "600px", xl: "500px" },
          }}
        >
          {/* title */}
          <Box
            sx={{
              mb: "30px",
            }}
          >
            <Typography
              className="text-black"
              variant="h5"
              component="h2"
              sx={{
                fontWeight: "600",
                mb: "5px",
                fontSize: { xs: "30px", md: "35px", xl: "40px" },
              }}
            >
              Đăng Nhập
            </Typography>

            <Typography
              className="text-black"
              variant="grayText"
              component="p"
              sx={{
                fontSize: { xs: "12px", xl: "13px" },
                fontWeight: "500",
              }}
            >
              Bạn chưa có tài khoản?
              <Link className="text-blue-500 pl-3" href="/register">
                Đăng ký
              </Link>
            </Typography>
          </Box>

          {/* form */}
          <form onSubmit={formik.handleSubmit}>
            {/* email */}
            <Box
              sx={{
                mb: "10px",
              }}
            >
              <Typography
                className="text-black"
                variant="body1"
                sx={{
                  fontWeight: "600",
                  mb: "3px",
                  fontSize: { xs: "13px", md: "15px" },
                }}
              >
                Email
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="email"
                id="email"
                onBlur={formik.handleBlur}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={
                  formik.touched.email && formik.errors.email ? true : false
                }
                helperText={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ""
                }
              />
            </Box>

            {/* password */}
            <Box
              sx={{
                mb: "10px",
              }}
            >
              <Typography
                className="text-black"
                variant="body1"
                sx={{
                  fontWeight: "600",
                  mb: "3px",
                  fontSize: { xs: "14px", md: "15px" },
                }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="password"
                name="password"
                id="password"
                onBlur={formik.handleBlur}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
                helperText={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : ""
                }
              />
            </Box>

            {/* submit button */}
            <Button
              className="bg-blue-600"
              variant="contained"
              type="submit"
              fullWidth
              sx={{ height: "45px" }}
            >
              Đăng nhập
            </Button>

            {/* OR */}
          </form>
        </Box>
      </div>
    </>
  );
}

export default LoginPage;
