import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
    Avatar,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    TextField,
} from '@mui/material'
import Typography from '@mui/material/node/Typography'
import { Box, Container } from '@mui/system'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as Yup from 'yup'
import { postUser } from '../redux/asyncActions/user/postUser'
import { postAuthLoginPassword } from '../redux/asyncActions/user/postAuthLoginPassword'
import { useNavigate } from 'react-router-dom'
import handleUploadPictures from '../utils/handleUploadPictures'

const { VITE_APP_PRESET_USER } = import.meta.env

const initialValues = {
    nickname: '',
    fullName: '',
    img: '',
    email: '',
    password: '',
    showPassword: false,
    showConfirmPassword: false,
}
const validate = Yup.object({
    nickname: Yup.string(),
    fullName: Yup.string(),
    img: Yup.string(),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .required('Please enter your password')
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'Password not Valid'
        ),
})
const Register = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.user)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState([
        'https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png',
    ])

    const navigate = useNavigate()

    const preset = VITE_APP_PRESET_USER

    useEffect(() => {
        if (userInfo !== undefined) {
            dispatch(
                postAuthLoginPassword({
                    email: userInfo.email,
                    password: userInfo.password,
                })
            )

            navigate('/profile')
        }
    }, [dispatch, userInfo])

    const onSubmit = (values) => {
        const { showPassword, showConfirmPassword, ...input } = values

        dispatch(
            postUser({
                ...input,
                nickname: input.nickname,
                fullName: input.fullName,
                password: input.password,
                email: input.email,
                img: image[image.length - 1],
            })
        )
    }
    const formik = useFormik({
        initialValues,
        validationSchema: validate,
        onSubmit,
    })
    return (
        <Container sx={{ marginBottom: 10 }} maxWidth="lg">
            <Paper elevation={3}>
                <Box marginY={5}>
                    <Box textAlign={'center'} paddingY={3}>
                        <Typography variant={'h3'}>Register</Typography>
                    </Box>
                    <Box
                        component={'form'}
                        onSubmit={formik.handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',

                            '& .MuiTextField-root': { m: 2, width: '35rem' },
                        }}
                    >
                        <TextField
                            placeholder="Enter your username"
                            name="nickname"
                            id="nickname"
                            label="Username"
                            type="text"
                            value={formik.values.nickname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(
                                formik.touched.nickname &&
                                    formik.errors.nickname
                            )}
                            helperText={
                                formik.touched.nickname &&
                                formik.errors.nickname
                            }
                        ></TextField>

                        <TextField
                            placeholder="Enter your Name and Lastname"
                            name="fullName"
                            id="fullName"
                            label="Fullname"
                            type="text"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(
                                formik.touched.fullName &&
                                    formik.errors.fullName
                            )}
                            helperText={
                                formik.touched.fullName &&
                                formik.errors.fullName
                            }
                        ></TextField>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <Avatar
                                src={image[image.length - 1]}
                                sx={{ width: 100, height: 100 }}
                            ></Avatar>
                        )}

                        <TextField
                            type="file"
                            id="img"
                            name="img"
                            placeholder="Upload an image"
                            helperText="Please upload an user picture"
                            onChange={(e) =>
                                handleUploadPictures(
                                    e,
                                    setLoading,
                                    setImage,
                                    preset
                                )
                            }
                        ></TextField>

                        <TextField
                            placeholder="Ej:myname@gmail.com"
                            name="email"
                            id="email"
                            label="Email"
                            type="text"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(
                                formik.touched.email && formik.errors.email
                            )}
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                        ></TextField>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'rows',
                                alignItems: 'center',
                                gap: '2rem',
                                justifyContent: 'space-evenly',
                                // '& .MuiTextField-root': {
                                //     m: 2,
                                //     width: '35rem',
                                // },
                            }}
                        >
                            <FormControl>
                                <InputLabel htmlFor="password">
                                    Password
                                </InputLabel>
                                <OutlinedInput
                                    required
                                    error={Boolean(
                                        formik.touched.password &&
                                            formik.errors.password
                                    )}
                                    id="password"
                                    label="Password"
                                    placeholder="Password"
                                    type={
                                        formik.values.showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={(e) =>
                                                    formik.setFieldValue(
                                                        'showPassword',
                                                        !formik.values
                                                            .showPassword
                                                    )
                                                }
                                                onMouseDown={(e) =>
                                                    e.preventDefault()
                                                }
                                                edge="end"
                                            >
                                                {formik.values.showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {formik.touched.password &&
                                    formik.errors.password && (
                                        <FormHelperText>
                                            {formik.errors.password}
                                        </FormHelperText>
                                    )}
                            </FormControl>

                            <FormControl>
                                <InputLabel htmlFor="confirmpassword">
                                    Confirm password
                                </InputLabel>
                                <OutlinedInput
                                    required
                                    error={Boolean(
                                        formik.touched.confirmpassword &&
                                            formik.errors.confirmpassword
                                    )}
                                    id="confirmpassword"
                                    label="Confirm password"
                                    placeholder="Password"
                                    type={
                                        formik.values.showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    name="confirmpassword"
                                    onChange={formik.handleChange}
                                    value={formik.values.confirmpassword}
                                    onBlur={formik.handleBlur}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                disabled={
                                                    formik.values.password ===
                                                    ''
                                                }
                                                onClick={(e) =>
                                                    formik.setFieldValue(
                                                        'showConfirmPassword',
                                                        !formik.values
                                                            .showConfirmPassword
                                                    )
                                                }
                                                onMouseDown={(e) =>
                                                    e.preventDefault()
                                                }
                                                edge="end"
                                            >
                                                {formik.values
                                                    .showConfirmPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    disabled={formik.values.password === ''}
                                />
                                {formik.touched.confirmpassword &&
                                    formik.errors.confirmpassword && (
                                        <FormHelperText>
                                            {formik.errors.confirmpassword}
                                        </FormHelperText>
                                    )}
                            </FormControl>
                        </Box>
                        <Button
                            sx={{
                                marginTop: 5,
                                width: '17rem',
                                height: '3rem',
                                marginBottom: 5,
                            }}
                            type="submit"
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}

export default Register
